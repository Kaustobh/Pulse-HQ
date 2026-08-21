import React, { useEffect, useRef, useState } from 'react';

export default function LiquidMetalShader({ style, className }) {
  const canvasRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebglSupported(false);
      return;
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Vertex Shader Source
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader Source (Liquid Metal: steep smoothstep, 8th power specular, cubed dark term, zero chroma)
    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform vec2 u_pointer;
      uniform float u_time;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 m = (u_pointer * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        float t = u_time * 0.45;
        float d = length(p - m);
        float mouseWarp = exp(-d * 2.8) * 0.7;
        
        for (int i = 1; i < 4; i++) {
          float fi = float(i);
          p.x += 0.35 / fi * sin(fi * 2.8 * p.y + t + mouseWarp * 3.5);
          p.y += 0.35 / fi * cos(fi * 2.8 * p.x + t + mouseWarp * 3.5);
        }
        
        // Warped field taken through a steep smoothstep
        float fieldVal = smoothstep(-0.15, 0.15, sin(p.x * 2.2 + p.y * 2.2 + t));
        
        // Cubed dark term
        float darkTerm = pow(1.0 - fieldVal, 3.0);
        
        // Narrow 8th power highlight band (narrow specular)
        float specRaw = clamp(sin(p.x * 4.5 + p.y * 4.5 + t * 1.6), 0.0, 1.0);
        float specular = pow(specRaw, 8.0);
        
        // Final monochrome value ramp (no chroma)
        float v = clamp(darkTerm * 0.12 + fieldVal * 0.35 + specular * 0.9, 0.0, 1.0);
        
        // Subtle metallic tint mapping
        gl_FragColor = vec4(vec3(v * 0.85, v * 0.88, v * 0.95), 0.85);
      }
    `;

    // Helper: Compile Shader
    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, vsSource);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertShader || !fragShader) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // Full-screen Quad Buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform Locations
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uPointer = gl.getUniformLocation(program, 'u_pointer');
    const uTime = gl.getUniformLocation(program, 'u_time');

    let pointerX = canvas.clientWidth / 2;
    let pointerY = canvas.clientHeight / 2;
    let animationFrameId;
    let startTime = performance.now();

    // Resize Handler
    const resizeCanvas = () => {
      const width = canvas.clientWidth || canvas.parentElement?.clientWidth || 300;
      const height = canvas.clientHeight || canvas.parentElement?.clientHeight || 200;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    // Pointer Handler
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = rect.height - (e.clientY - rect.top); // WebGL inverted Y
    };

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('pointermove', handlePointerMove);
    resizeCanvas();

    // Render Loop
    const render = (now) => {
      const elapsed = prefersReducedMotion ? 1.5 : (now - startTime) * 0.001;

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uPointer, pointerX, pointerY);
      gl.uniform1f(uTime, elapsed);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render(performance.now());

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('pointermove', handlePointerMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!webglSupported) {
    return (
      <div
        className={className}
        style={{
          ...style,
          background: 'radial-gradient(circle at 50% 50%, #2A2F3E 0%, #11141E 100%)',
          borderRadius: 20
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        borderRadius: '20px',
        pointerEvents: 'auto',
        ...style
      }}
    />
  );
}
