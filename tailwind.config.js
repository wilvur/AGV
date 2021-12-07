module.exports = {
  purge: {
    enabled: false,
    content: ['./dist/*.html', './dist/*.js' ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {azul_Agv1: '#00376F' , azul_Avg2: '#386796', azul_Avg3: '#D3DCE4', azul_Avg4: '#BCCEF8' },
      minHeight: {'pantalla' : '90vh','mediaPantalla' : '45vh', 'semicompleta': '65vh'}
    
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
