// Regie van de scroll-reis. ScrollTriggers schrijven, de 3D-scene leest
// in useFrame — zo blijft React buiten de render-loop.
export const director = {
  chapter: 0, // index in CHAPTERS
  bouwProgress: 0, // voortgang binnen het DE BOUW-hoofdstuk (0..1)
  scroll: 0, // totale paginavoortgang (0..1)
}

// Compat: oudere naam die de bouw-voortgang van het huis aanstuurde.
export const heroState = { progress: 0 }
