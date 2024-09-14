import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from './ThemeContext';
import { Download, X } from 'lucide-react';
import { toPng } from 'html-to-image';

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme, isDarkMode }) => ({
  backgroundColor: isDarkMode ? '#1e2124' : '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  padding: theme.spacing(4),
  maxWidth: '90%',
  maxHeight: '90%',
  overflow: 'auto',
  position: 'relative',
}));

const CloseButton = styled(Button)(({ theme, isDarkMode }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  minWidth: 'auto',
  padding: theme.spacing(1),
  color: isDarkMode ? '#a0a0a0' : '#666666',
  '&:hover': {
    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  },
}));

const QRImage = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  display: 'block',
  margin: '20px auto',
});

const ActionButton = styled(Button)(({ theme, isDarkMode }) => ({
  backgroundColor: '#4ade80',
  color: '#000000',
  '&:hover': {
    backgroundColor: '#22c55e',
  },
  margin: theme.spacing(2, 0),
}));

const PlantTrackerQRModal = ({ open, onClose, selectedQR, plantCode }) => {
  const { isDarkMode } = useTheme();

  const downloadQR = () => {
    if (selectedQR) {
      const qrContainer = document.createElement('div');
      qrContainer.style.padding = '20px';
      qrContainer.style.backgroundColor = 'white';

      const qrImage = document.createElement('img');
      qrImage.src = selectedQR;
      qrImage.style.width = '300px';
      qrImage.style.height = '300px';

      qrContainer.appendChild(qrImage);
      document.body.appendChild(qrContainer);

      toPng(qrContainer, { quality: 1, width: 340, height: 340 })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `PlantTracker_QR_${plantCode}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('Error generating QR code image:', error);
        })
        .finally(() => {
          document.body.removeChild(qrContainer);
        });
    }
  };

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby="qr-modal-title"
      aria-describedby="qr-modal-description"
    >
      <ModalContent isDarkMode={isDarkMode}>
        <CloseButton onClick={onClose} isDarkMode={isDarkMode}>
          <X size={24} />
        </CloseButton>
        <Typography variant="h5" component="h2" id="qr-modal-title" gutterBottom>
          Plant QR Code
        </Typography>
        <Typography variant="body1" id="qr-modal-description" paragraph>
          Scan this QR code to quickly access information about plant {plantCode} in the Plant Tracker app.
        </Typography>
        {selectedQR ? (
          <QRImage src={selectedQR} alt={`QR Code for plant ${plantCode}`} />
        ) : (
          <Typography color="error">Unable to load QR code.</Typography>
        )}
        {selectedQR && (
          <ActionButton
            onClick={downloadQR}
            variant="contained"
            startIcon={<Download />}
            fullWidth
          >
            Download QR Code
          </ActionButton>
        )}
        <Typography variant="body2" color="textSecondary" align="center">
         Utilice este código QR para acceder y actualizar rápidamente la información de la planta en el campo.
        </Typography>
      </ModalContent>
    </StyledModal>
  );
};

export default PlantTrackerQRModal;