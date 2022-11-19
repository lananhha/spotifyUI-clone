/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        black: '#000',
        textColor: '#b3b3b3',
        textColor2: '#a7a7a7',
        bgHeader: 'rgba(16,16,16,0.8)',
        bgHomePage: '#121212',
        primary: '#1ed760'
      },
      
      spacing :{
        leftContent: 'var(--sidebar-width)',
        mtHeader: 'var(--header-height)',
        minHeightBgPlaylist: 'var(--playlist-background-min-height)',
        nowPlayingHeight: 'var(--now-playing-height)',
        mtResultSearch: '80px'
      },
      
      width: {
        sidebarWidth: 'var(--sidebar-width)',
        contentWidth: 'calc(100vw - var(--sidebar-width))',
      },
      height: {
        headerHeight: 'var(--header-height)',
        nowPlayingHeight: 'var(--now-playing-height)'
      },
      minHeight:{
        minHeight: '600px',
        minHeightBgPlaylist: 'var(--playlist-background-min-height)'
      },
      maxWidth:{
        episodeMaxWidth: 'var(--episode-max-width)'
      },
      boxShadow: {
        boxShadowHeader: '0 1px 1px 0 #1a1a1a',
        box2ShadowHeader: '2px -100px 1px 10px rgba(16,16,16,0.1)',
        imgShadow: '0 8px 24px rgb(0 0 0 / 50%)'
      }
    },
    fontSize: {
      base: '1rem',
      sm: '0.875rem',
      xl:'1.25rem',
      '2xl':'1.5rem',
      xs: '0.75rem',
      '3xl': '1.875rem'
    },
  },
  plugins: [],
}


