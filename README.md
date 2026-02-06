# 🌌 Exo-Quetzal: Exoplanet Predictor

¡Bienvenido a **Exo-Quetzal**, nuestro proyecto desarrollado para el **NASA Space Apps Hackathon**!
Exo-Quetzal es una herramienta de vanguardia que utiliza **aprendizaje profundo** para analizar lecturas astronómicas y determinar si una señal corresponde a un **exoplaneta potencial**.

---

## 🚀 Tecnologías Utilizadas

Este proyecto es una aplicación web completa que integra un **backend en Python** con un **frontend interactivo en React**.

### 🧠 Backend

* **Python**: Lenguaje principal para la lógica del servidor.
* **Flask**: Micro-framework para construir la API.
* **Pandas**: Para el manejo y preprocesamiento de datos astronómicos.
* **Deep Learning**: Redes neuronales desarrolladas y entrenadas en **Google Colab**.
* **TensorFlow Serving**: Para servir los modelos de aprendizaje profundo de manera eficiente.
* **Docker**: Para contenerizar y desplegar los servicios del backend.

### 🌐 Frontend

* **React**: Biblioteca de JavaScript para construir la interfaz de usuario.
* **Three.js**: Para renderizar modelos 3D de los exoplanetas.
* **PNPM**: Gestor de paquetes para la gestión de dependencias.

---

## 📡 Modelos de Aprendizaje Profundo

Los modelos de **redes neuronales** de Exo-Quetzal están basados en datos oficiales de la **NASA**, específicamente de las misiones **Kepler**, **Kepler 2** y **TESS**.
Estos modelos fueron entrenados para identificar patrones característicos de señales de tránsito planetario y ya están **hospedados y servidos mediante TensorFlow Serving**, por lo que **no es necesario instalarlos ni configurarlos localmente**.
El backend se conecta automáticamente a ellos para realizar las predicciones.

---

## 🛠️ Instalación y Configuración

### 📦 Backend

1. Clona el repositorio:

   ```bash
   git clone https://github.com/UrielCandelasMeza/SpaceApps_Hackathon.git
   cd SpaceApps_Hackathon/server
   ```

2. Crea y activa un entorno virtual:

   ```bash
   python -m venv venv
   # En Windows
   venv\Scripts\activate
   # En macOS/Linux
   source venv/bin/activate
   ```

3. Instala las dependencias:

   ```bash
   pip install -r requirements.txt
   ```

4. Ejecuta el servidor:

   ```bash
   flask run
   ```

   El backend se ejecutará en **[http://localhost:5000](http://localhost:5000)**.

---

### 🖥️ Frontend

1. Navega al directorio del cliente:

   ```bash
   cd ../client
   ```

2. Instala las dependencias con PNPM:

   ```bash
   pnpm install
   ```

3. Inicia la aplicación de desarrollo:

   ```bash
   pnpm run dev
   ```

   El frontend estará disponible en **[http://localhost:3000](http://localhost:3000)**.

---

## 🤝 Contribuciones

Si deseas contribuir, ¡serás bienvenido!
Haz un **fork** del repositorio, implementa tus mejoras y envía un **pull request**.
Por favor, asegúrate de que tu código siga las buenas prácticas del proyecto.