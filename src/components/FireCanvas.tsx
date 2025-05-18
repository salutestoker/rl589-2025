import React, { useRef, useEffect } from 'react';


/**
 * FireCanvas – full-screen WebGL fire shader wrapped in a React component.
 *
 * • Pure client‑side (safe for Next.js Pages Router SSR).
 * • No external loaders; the fragment shader is embedded verbatim from your original fire.html.
 * • Canvas is fixed behind content (zIndex –1) and stretches with the window.
 *
 * Drop this file into /src/components and import <FireCanvas /> anywhere.
 */

export const FireCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        /**
         * Basic WebGL 1 context
         */
        const gl = canvas.getContext('webgl');
        if (!gl) {
            console.error('WebGL not supported');
            return;
        }

        /**
         * Shader sources
         */
        const VERTEX_SHADER = `
attribute vec3 position;
void main() {
  gl_Position = vec4(position, 1.0);
}`;

        /*
         * The fragment shader below is copied **verbatim** from the <script id="fs"> block
         * in your original fire.html, with **nothing removed**.  It already contains its own
         * void main() entry and calls mainImage(), so we do NOT wrap it again.
         */
        const FRAGMENT_SHADER = String.raw`#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision highp float;
#endif

uniform vec2 resolution;
uniform float time;
uniform vec4 mouse;
uniform vec4 date;
uniform int pointerCount;
uniform vec3 pointers[10];
float anim = 0.1;

//uniform vec3      resolution;           // viewport resolution (in pixels)
uniform float     iTime;                 // shader playback time (in seconds)
uniform float     iTimeDelta;            // render time (in seconds)
uniform float     iFrameRate;            // shader frame rate
uniform int       iFrame;                // shader playback frame
uniform float     iChannelTime[4];       // channel playback time (in seconds)
uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
//uniform vec4      mouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
uniform sampler2D iChannel0, iChannel1, iChannel2, iChannel3;        // input channel. XX = 2D/Cube
//uniform vec4      date;                 // (year, month, day, time in seconds)
uniform float     iSampleRate;           // sound sample rate (i.e., 44100)
uniform float iBlockOffset;

/* === utility noise functions (Ashima et al.) === */
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=(floor(j*ns.z));vec4 y_=(floor(j-7.0*x_));vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=inversesqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}

/* === helper functions used by mainImage === */
float prng(in vec2 seed){seed=fract(seed*vec2(5.3983,5.4427));seed+=dot(seed.yx,seed.xy+vec2(21.5351,14.3137));return fract(seed.x*seed.y);}float PI=3.1415926535897932384626433832795;

float noiseStack(vec3 pos,int octaves,float falloff){float n=snoise(pos);float o=1.0;if(octaves>1){pos*=2.0;o*=falloff;n=(1.0-o)*n+o*snoise(pos);}if(octaves>2){pos*=2.0;o*=falloff;n=(1.0-o)*n+o*snoise(pos);}if(octaves>3){pos*=2.0;o*=falloff;n=(1.0-o)*n+o*snoise(pos);}return(1.0+n)/2.0;}
vec2 noiseStackUV(vec3 pos,int octaves,float falloff,float diff){float a=noiseStack(pos,octaves,falloff);float b=noiseStack(pos+vec3(3984.293,423.21,5235.19),octaves,falloff);return vec2(a,b);} 

/* === main fire routine === */
void mainImage(out vec4 fragColor,in vec2 fragCoord){float time2=iTime+time;vec2 res=resolution.xy;vec2 drag=mouse.xy+sin(time2);vec2 offset=mouse.xy+cos(time2);float xpart=fragCoord.x/res.x;float ypart=fragCoord.y/res.y;float clip=210.0;float ypartClip=fragCoord.y/clip;float yFalloff=clamp(2.0-ypartClip,0.0,1.0);float yClipped=min(ypartClip,1.0);float yClippedN=1.0-yClipped;float xfuel=1.0-abs(2.0*xpart-1.0);float timeSpeed=0.5;float realTime=timeSpeed*time2;vec2 coordScaled=0.01*fragCoord-0.02*vec2(offset.x,0.0);vec3 position=vec3(coordScaled,0.0)+vec3(1223.0,6434.0,8425.0);vec3 flow=vec3(4.1*(0.5-xpart)*pow(yClippedN,4.0),-2.0*xfuel*pow(yClippedN,64.0),0.0);vec3 timing=realTime*vec3(0.0,-1.7,1.1)+flow;vec3 displacePos=vec3(1.0,0.5,1.0)*2.4*position+realTime*vec3(0.01,-0.7,1.3);vec3 displace3=vec3(noiseStackUV(displacePos,2,0.4,0.1),0.0);vec3 noiseCoord=(vec3(2.0,1.0,1.0)*position+timing+0.4*displace3)/1.0;float noise=noiseStack(noiseCoord,3,0.4);float flames=pow(yClipped,0.3*xfuel)*pow(noise,0.3*xfuel);float f=yFalloff*pow(1.0-flames*flames*flames,8.0);float f3=f*f*f;vec3 fire=1.5*vec3(f,f3,f3*f3);float smokeNoise=0.5+snoise(0.4*position+timing*vec3(1.0,1.0,0.2))/2.0;vec3 smoke=vec3(0.3*pow(xfuel,3.0)*pow(ypart,2.0)*(smokeNoise+0.4*(1.0-noise)));float sparkGridSize=30.0;vec2 sparkCoord=fragCoord-vec2(2.0*offset.x,190.0*realTime);sparkCoord-=30.0*noiseStackUV(0.01*vec3(sparkCoord,30.0*time2),1,0.4,0.1);sparkCoord+=100.0*flow.xy;if(mod(sparkCoord.y/sparkGridSize,2.0)<1.0)sparkCoord.x+=0.5*sparkGridSize;vec2 sparkGridIndex=vec2(floor(sparkCoord/sparkGridSize));float sparkRandom=prng(sparkGridIndex);float sparkLife=min(10.0*(1.0-min((sparkGridIndex.y+(190.0*realTime/sparkGridSize))/(24.0-20.0*sparkRandom),1.0)),1.0);vec3 sparks=vec3(0.0);if(sparkLife>0.0){float sparkSize=xfuel*xfuel*sparkRandom*0.08;float sparkRadians=999.0*sparkRandom*2.0*PI+2.0*time2;vec2 sparkCircular=vec2(sin(sparkRadians),cos(sparkRadians));vec2 sparkOffset=(0.5-sparkSize)*sparkGridSize*sparkCircular;vec2 sparkMod=mod(sparkCoord+sparkOffset,sparkGridSize)-0.5*vec2(sparkGridSize);float sparkLen=length(sparkMod);float sparksGray=max(0.0,1.0-sparkLen/(sparkSize*sparkGridSize));sparks=sparkLife*sparksGray*vec3(1.0,0.3,0.0);}fragColor=vec4(max(fire,sparks)+smoke,1.0);} 

void main(){vec4 colorx;mainImage(colorx,gl_FragCoord.xy);gl_FragColor=colorx;}
`;

        /** compile helper */
        const compile = (src: string, type: number) => {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, src);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                throw new Error(gl.getShaderInfoLog(shader) || 'shader error');
            }
            return shader;
        };

        const vs = compile(VERTEX_SHADER, gl.VERTEX_SHADER);
        const fs = compile(FRAGMENT_SHADER, gl.FRAGMENT_SHADER);

        const program = gl.createProgram()!;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program));
            return;
        }
        gl.useProgram(program);

        /** full‑screen quad (two triangles as strip) */
        const positionBuffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                -1, -1, 0,
                1, -1, 0,
                -1,  1, 0,
                1,  1, 0,
            ]),
            gl.STATIC_DRAW
        );

        const positionLoc = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

        /** uniform locations */
        const uResolution = gl.getUniformLocation(program, 'resolution');
        const uTime = gl.getUniformLocation(program, 'time');
        const uMouse = gl.getUniformLocation(program, 'mouse');

        /** resize helper */
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();
        window.addEventListener('resize', resize);

        let mouse: [number, number] = [0.5, 0.5];
        const onMove = (e: MouseEvent) => {
            mouse = [e.clientX / canvas.width, 1 - e.clientY / canvas.height];
        };
        window.addEventListener('mousemove', onMove);

        const start = performance.now();
        const render = () => {
            const t = (performance.now() - start) * 0.001;

            gl.uniform2f(uResolution, canvas.width, canvas.height);
            gl.uniform2f(uMouse, ...mouse);
            gl.uniform1f(uTime, t);

            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            gl.deleteBuffer(positionBuffer);
            gl.deleteProgram(program);
            gl.deleteShader(vs);
            gl.deleteShader(fs);
        };
    }, []);

    return <canvas className="fire-canvas" ref={canvasRef} style={{ position: 'fixed', pointerEvents: "none", inset: 0, width: '100%', height: '100%', display: 'block', zIndex: 1 }} />;
};
