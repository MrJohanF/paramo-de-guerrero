import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from "../contexts/ThemeContext";
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedTypography = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

const FormattedRecommendations = ({ recommendation }) => {
  const { isDarkMode } = useTheme();
  const [visibleSections, setVisibleSections] = useState(0);
  const recommendations = recommendation.split('**').filter(item => item.trim() !== '');
  const containerRef = useRef(null);

  const textColor = isDarkMode ? "#e0e0e0" : "#333333";
  const titleColor = isDarkMode ? "#4ade80" : "#22c55e";

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSections(prev => {
        if (prev < recommendations.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 500); // Ajustado a 500ms para una velocidad moderada

    return () => clearInterval(interval);
  }, [recommendations.length]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [visibleSections]);

  return (
    <Box mt={4} ref={containerRef}>
      <AnimatedTypography>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom 
          color={titleColor}
          sx={{ fontWeight: 'bold', mb: 3 }}
        >
          Recomendaciones de Cuidado
        </Typography>
      </AnimatedTypography>

      <AnimatePresence>
        {recommendations.slice(0, visibleSections).map((rec, index) => {
          let title = '';
          let content = '';
          if (rec.includes(':')) {
            [title, content] = rec.split(':');
          } else {
            content = rec;
          }

          return (
            <AnimatedTypography key={index} delay={0.2}>
              <Box mb={3}>
                {title && (
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    color={titleColor}
                    sx={{ fontWeight: 'bold', mb: 1 }}
                  >
                    {index > 0 ? `${index}. ${title.trim()}` : title.trim()}
                  </Typography>
                )}
                <Typography 
                  variant="body1" 
                  color={textColor}
                >
                  {content ? content.trim() : rec.trim()}
                </Typography>
              </Box>
            </AnimatedTypography>
          );
        })}
      </AnimatePresence>
    </Box>
  );
};

export default FormattedRecommendations;