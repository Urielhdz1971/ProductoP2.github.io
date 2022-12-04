let nombreCache='uno';

self.addEventListener(
    'install',
    function(event){
        //esperar hasta que la promesa que recibe sea concluida 
        event.waitUntill(
            caches.open(nombreCache)
            .then( // then es un metodo para las promesas 
                function(cache){
                    cache.addAll(
                        [
                            'canvas.html',
                            'canvas.js',
                            'w3.css',
                            'sw.js',
                            'style.css'
                        ]
                    );
                }
            )
            );
    }
);


self.addEventListener(
    'fetch', 
    function(event) {
           event.respondWith( 
              caches.match(event.request)
                .then(
                    function(respuesta){
                        if(respuesta!=null){
                            return respuesta;                            
                        }
                        else{

                        return  fetch(event.request);

                       // XMLHttpRequest ajax = new XMLHttpRequest();
                        }
                    }
                )
            );     
    }
); 