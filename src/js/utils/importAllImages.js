// function to import all images

export const images = {};
export const symbols = {};

function importAll(r, obj) {
  r.keys().forEach(key => obj[key] = r(key));
}

// At build-time cache will be populated with all required images.
importAll(
  require.context('../../assets/img/', true, /^((?![\\/]symbols[\\/]).)*\.(jpg|jpeg|svg|png)$/),
  images
);
importAll(require.context('../../assets/img/symbols/', false, /\.svg$/), symbols);
