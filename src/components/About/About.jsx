import { Box, Typography, Button, Divider, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        textAlign: 'center', 
        py: 10,
        px: 2,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: 'white',
        minHeight: '100vh'
      }}
    >
      {/* Animated Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 900, mb: 2 }}>
          About Me
        </Typography>
        <Divider sx={{ borderColor: 'white', width: '50%', mx: 'auto', mb: 4 }} />
      </motion.div>

      {/* Exploding Text */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Typography variant="h5" sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}>
          I’m a passionate developer who turns coffee into code ☕,  
          fights bugs like a superhero 🦸, and builds things that make people go *"WOW!"*  
        </Typography>
      </motion.div>

      {/* Floating Grid of Skills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', margin: '40px 0' }}
      >
        {['React', 'Node.js', 'UI/UX', 'AI', 'Pizza Baking'].map((skill) => (
          <motion.div
            key={skill}
            whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
          >
            <Button 
              variant="outlined" 
              sx={{ 
                color: 'white', 
                borderColor: 'white', 
                borderRadius: '50px',
                px: 3,
                py: 1
              }}
            >
              {skill}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* Call-to-Action */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          sx={{ 
            mt: 4, 
            px: 6, 
            py: 2,
            fontSize: '1.2rem',
            background: 'white',
            color: theme.palette.primary.main,
            '&:hover': { background: '#f5f5f5' }
          }}
        >
          Back Home
        </Button>
      </motion.div>
    </Box>
  );
};

export default About;