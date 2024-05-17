
const { src, dest, watch, series, parallel} = require('gulp');

// CSS y SASS (dependencias)
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer =require('autoprefixer');


// Imagenes (dependencias)
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp'); //el paguete gulp-webp es la que exporta la función (webp) que puedes llamar como desees 
//const avif = require('imagemin-avif');

function css( done ) {
    // compilar sass
    //pasos: 1- identificar archivo, 2- Compilarla, 3- Guardar el .css

    src('src/scss/app.scss')
        .pipe( sass())
        .pipe( postcss([autoprefixer()]))
        .pipe( dest('build/css'))

    done();
}

function imagenes(  ) { 
    return src('src/img/**/*') //no se especifica tipo de archivo porque hay img, avif,etc
        .pipe( imagemin({ optimizationLevel: 3})) //se coloca antes de DEST para que se guarde ya habiendo sido aligeradas
        .pipe( dest('build/img')) //las guarda en esa direccion
        
        //return reemplaza a done
}

function versionWebp() { //a la tarea no la puedes llamar como la funcion (ambas son funciones solo para diferenciar xd)
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}') // **= todo el contenido de las carpetas *=todos los archivos
        .pipe( webp(opciones))
        .pipe( dest('build/img'))
}

// function versionAvif() {
//     const opciones = {
//         quality: 50
//     }
//     return src('src/img/**/*.{png,jpg}')
//         .pipe( imagemin([avif( {quality: 50} ) ]))
//         .pipe( dest('build/img'))
// }


function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}


exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
// exports.versionAvif = versionAvif;

exports.default = series( imagenes, versionWebp, css, dev ); //se hace run con gulp

//series - Se inicia una tarea, y hasta que finaliza, inicia la siguiente
// parallel - Todas inician al mismo tiempo