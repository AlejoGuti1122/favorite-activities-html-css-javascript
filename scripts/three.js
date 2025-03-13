const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  alpha: true,
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

// Array para almacenar las partículas
const particles = []

// Función para crear partículas con formas variadas
function createParticle() {
  const geometries = [
    new THREE.OctahedronGeometry(0.5),
    new THREE.TetrahedronGeometry(0.5),
    new THREE.IcosahedronGeometry(0.5),
  ]

  const geometry = geometries[Math.floor(Math.random() * geometries.length)]
  const material = new THREE.MeshPhongMaterial({
    color: 0xbe8bd2,
    transparent: true,
    opacity: 0.7,
    shininess: 100,
  })

  const particle = new THREE.Mesh(geometry, material)

  // Posición inicial aleatoria en la parte superior
  particle.position.x = Math.random() * 60 - 30
  particle.position.y = Math.random() * 20 + 30
  particle.position.z = Math.random() * 30 - 15

  // Velocidad de caída y rotación aleatorias
  particle.velocity = Math.random() * 0.05 + 0.02
  particle.rotationSpeed = {
    x: Math.random() * 0.02,
    y: Math.random() * 0.02,
    z: Math.random() * 0.02,
  }

  scene.add(particle)
  particles.push(particle)
}

// Crear luces
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(5, 5, 5)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(pointLight, ambientLight)

// Crear partículas iniciales
for (let i = 0; i < 50; i++) {
  createParticle()
}

// Función de animación
function animate() {
  requestAnimationFrame(animate)

  particles.forEach((particle, index) => {
    // Movimiento de caída
    particle.position.y -= particle.velocity

    // Rotación
    particle.rotation.x += particle.rotationSpeed.x
    particle.rotation.y += particle.rotationSpeed.y
    particle.rotation.z += particle.rotationSpeed.z

    // Si la partícula cae fuera de vista, la reposicionamos arriba
    if (particle.position.y < -20) {
      particle.position.y = Math.random() * 20 + 30
      particle.position.x = Math.random() * 60 - 30
    }
  })

  // Efecto de movimiento suave de la cámara
  camera.position.x = Math.sin(Date.now() * 0.0005) * 3
  camera.position.y = Math.cos(Date.now() * 0.0003) * 3
  camera.lookAt(scene.position)

  renderer.render(scene, camera)
}

// Manejar resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

animate()
