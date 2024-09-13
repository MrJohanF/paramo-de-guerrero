import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeContext";
import {
  Leaf,
  ArrowRight,
  Droplet,
  Sun,
  BarChart3,
  Bell,
  ChevronDown,
  Cpu,
} from "lucide-react";
import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeatureCard = ({ icon: Icon, title, description }) => {
  const { isDarkMode } = useTheme();
  return (
    <motion.div
      className={`p-6 rounded-lg ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg hover:shadow-xl transition-shadow duration-300`}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Icon className="w-12 h-12 mb-4 text-green-500" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <div className="mb-4">
      <button
        className={`flex justify-between items-center w-full text-left p-4 rounded-lg ${
          isDarkMode
            ? "bg-gray-800 hover:bg-gray-700"
            : "bg-white hover:bg-gray-100"
        } transition-colors duration-300`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">{question}</span>
        <ChevronDown
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-4 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            } rounded-b-lg`}
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LandingPage = ({ onGetStarted }) => {
  const { isDarkMode } = useTheme();

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const carouselImages = [
    "/images/carousel-image-1.jpeg",
    "/images/carousel-image-2.jpeg",
    "/images/carousel-image-3.jpeg",
    "/images/carousel-image-4.jpeg",
  ];

  const features = [
    {
      icon: Droplet,
      title: "Control de Riego Inteligente",
      description:
        "IA que optimiza el riego basándose en datos de sensores de humedad.",
    },
    {
      icon: Sun,
      title: "Seguimiento de Luz Adaptativo",
      description:
        "Recomendaciones de IA para ajustar la exposición lumínica según las necesidades de cada planta.",
    },
    {
      icon: BarChart3,
      title: "Análisis Predictivo de Crecimiento",
      description:
        "Proyecciones de crecimiento basadas en machine learning y datos históricos.",
    },
    {
      icon: Cpu,
      title: "Diagnóstico de Salud por IA",
      description:
        "Detección temprana de enfermedades utilizando visión por computadora y datos de sensores.",
    },
  ];

  const faqs = [
    {
      question: "¿Cómo puedo empezar a usar Plant Tracker?",
      answer:
        "Simplemente regístrate en nuestra aplicación, agrega tus plantas y comienza a recibir recomendaciones personalizadas para su cuidado.",
    },
    {
      question: "¿Plant Tracker funciona con todo tipo de plantas?",
      answer:
        "Sí, nuestra base de datos incluye una amplia variedad de plantas, desde pequeñas suculentas hasta árboles frutales.",
    },
    {
      question: "¿Puedo usar Plant Tracker en múltiples dispositivos?",
      answer:
        "Absolutamente. Plant Tracker sincroniza tus datos en la nube, permitiéndote acceder desde cualquier dispositivo.",
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <header className="p-6 sticky top-0 z-50 bg-opacity-90 backdrop-filter backdrop-blur-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf
              className={`w-8 h-8 ${
                isDarkMode ? "text-green-400" : "text-green-600"
              }`}
            />
            <span className="text-xl font-bold">Plant Tracker</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#caracteristicas"
                  className="hover:text-green-500 transition-colors"
                >
                  Características
                </a>
              </li>
              <li>
                <a
                  href="#galeria"
                  className="hover:text-green-500 transition-colors"
                >
                  Galería
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-green-500 transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="hover:text-green-500 transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 bg-gradient-to-br from-green-500 via-green-400 to-blue-500 text-white">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Cultiva Inteligentemente con Plant Tracker
              </motion.h1>
              <motion.p
                className="text-xl mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Utiliza el poder de la IA y sensores avanzados para monitorear,
                analizar y optimizar la salud de tus plantas con precisión sin
                precedentes.
              </motion.p>
              <motion.button
                onClick={onGetStarted}
                className="px-8 py-4 bg-white text-green-600 rounded-full text-lg font-semibold transition-colors duration-300 hover:bg-green-100 flex items-center justify-center mx-auto md:mx-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Comienza a Rastrear <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <motion.div
                className="relative w-full h-64 md:h-96"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Image
                  src="/images/ai-plant-care.jpg"
                  alt="IA cuidando plantas"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="caracteristicas" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Características Principales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="galeria"
          className={`py-20 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
        >
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Galería de Plantas Monitoreadas por IA
            </h2>
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
              <Slider {...carouselSettings}>
                {carouselImages.map((img, index) => (
                  <div key={index} className="px-2">
                    <div className="relative w-full h-64 md:h-96">
                      <Image
                        src={img}
                        alt={`Planta Saludable ${index + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
              Nuestro sistema de IA analiza constantemente las imágenes y datos
              de sensores para proporcionar recomendaciones precisas.
            </p>
          </div>
        </section>

        <section id="faq" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Preguntas Frecuentes
            </h2>
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <FAQItem key={index} {...faq} />
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="py-20 bg-green-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">
              ¿Listo para mejorar el cuidado de tus plantas?
            </h2>
            <p className="mb-8 text-xl">
              Únete a Plant Tracker hoy y comienza a cultivar un jardín más
              saludable y feliz.
            </p>
            <motion.button
              onClick={onGetStarted}
              className="px-8 py-4 bg-white text-green-600 rounded-full text-lg font-semibold transition-colors duration-300 hover:bg-green-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Empieza Ahora
            </motion.button>
          </div>
        </section>
      </main>

      <footer className={`p-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}>
        <div className="container mx-auto text-center">
          <p>
            &copy; 2024 Plant Tracker. Ayudándote a cultivar plantas más
            saludables.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
