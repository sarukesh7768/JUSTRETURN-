import * as THREE from 'three';

export function initThreeScene() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // Scene Setup
    const scene = new THREE.Scene();
    
    // Camera Setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);
    
    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    // Note: outputColorSpace is set below if needed, though default usually works well.
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Particle System (3000 particles)
    const particleCount = 3000;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    const colorCyan = new THREE.Color('#00d4ff');
    const colorPurple = new THREE.Color('#7b2ff7');

    for(let i = 0; i < particleCount * 3; i+=3) {
        // Random positions in a sphere
        const r = 15 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        
        posArray[i] = r * Math.sin(phi) * Math.cos(theta);     // x
        posArray[i+1] = r * Math.sin(phi) * Math.sin(theta);   // y
        posArray[i+2] = r * Math.cos(phi);                     // z
        
        // Random color mix
        const mixedColor = colorCyan.clone().lerp(colorPurple, Math.random());
        colorArray[i] = mixedColor.r;
        colorArray[i+1] = mixedColor.g;
        colorArray[i+2] = mixedColor.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Floating Geometry Group
    const group = new THREE.Group();
    scene.add(group);
    
    // Torus
    const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshPhysicalMaterial({
        color: '#00d4ff',
        metalness: 0.3,
        roughness: 0.4,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-3, 1, -2);
    group.add(torus);
    
    // Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(0.8, 0);
    const icoMaterial = new THREE.MeshPhysicalMaterial({
        color: '#7b2ff7',
        metalness: 0.3,
        roughness: 0.4,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.position.set(3, -1, -3);
    group.add(icosahedron);
    
    // Octahedron
    const octGeometry = new THREE.OctahedronGeometry(0.5, 0);
    const octMaterial = new THREE.MeshPhysicalMaterial({
        color: '#ff006e',
        metalness: 0.3,
        roughness: 0.4,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const octahedron = new THREE.Mesh(octGeometry, octMaterial);
    octahedron.position.set(0, 2, -4);
    group.add(octahedron);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight('#00d4ff', 2);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight('#7b2ff7', 2);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();
        
        // Rotate particles
        particlesMesh.rotation.y += 0.0003;
        
        // Rotate geometries
        torus.rotation.x += 0.005;
        torus.rotation.y += 0.003;
        
        icosahedron.rotation.x -= 0.003;
        icosahedron.rotation.y += 0.005;
        
        octahedron.rotation.y += 0.007;
        octahedron.rotation.z += 0.005;
        
        // Float geometries
        torus.position.y = 1 + Math.sin(elapsedTime) * 0.2;
        icosahedron.position.y = -1 + Math.sin(elapsedTime + 2) * 0.2;
        octahedron.position.y = 2 + Math.sin(elapsedTime + 4) * 0.2;
        
        // Mouse parallax effect
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;
        
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);
        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        
        // Pan camera slightly based on mouse
        camera.position.x += (mouseX * 0.001 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.001 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
