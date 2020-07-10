    $(document).ready(function() {
        $('select').niceSelect();
    });  
    const origen= document.getElementById('origen');
    const destino=document.getElementById('destino');
    var consumo=0;

    class Vehiculo {
        constructor(){}
        avanzar() {
            return false;
        }
    }

    class Fiat extends Vehiculo {
        constructor(){
            super();
        }
        avanzar(distancia=1){
            consumo=(distancia/19.2).toFixed(2);
            console.log(consumo);
            return consumo;//km en carretera;
        }
    }

    class Toyota extends Vehiculo {
        constructor(){
                super();
        }
        avanzar(distancia=1){
            consumo=(distancia/20.8).toFixed(2);
            console.log(consumo);
            return consumo;//km en carretera;
        }
    }

    class Suzuki extends Vehiculo {
        constructor(){
            super();
        }
        avanzar(distancia=1){
            consumo=(distancia/22.7).toFixed(2);
            console.log(consumo);
            return consumo;//km en carretera;
        }
    }

    class Nissan extends Vehiculo {
        constructor() {
            super();
        }
        avanzar(distancia=1){
            //redondear numero variable.toFixed(2)
            consumo=(distancia/20).toFixed(2);
            console.log(consumo);
            return consumo;//km en carretera;
        }
    }

    function texto_modal(origen,destino,distancia,duracion,auto,consumo){
        document.getElementById('origin').innerHTML=origen;
        document.getElementById('destiny').innerHTML=destino;
        document.getElementById('km').innerHTML=distancia;
        document.getElementById('tiempo').innerHTML=duracion;
        document.getElementById('auto').innerHTML=auto;
        document.getElementById('combustible').innerHTML=consumo;
        $('#modal').modal('show'); 
    }

    function hacer_fetch(coords_origen, coords_destino, origen_nombre, destino_nombre, vehiculo) {
        fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+coords_origen+'&destinations='+coords_destino+'&key=AIzaSyAlDSRLGoUqLzoFZQlR7wvyRoNdsufoQls')
            .then(datos=>datos.json())
            .then(datos_json=> {
                const distancia=datos_json.rows[0].elements[0].distance.text;
                const duracion=datos_json.rows[0].elements[0].duration.text;
                const nombre_vehiculo=document.getElementById('vehiculo').value; 
                var distancia_numero=datos_json.rows[0].elements[0].distance.value;
                console.log(distancia_numero);
                vehiculo.avanzar((distancia_numero/1000));
                texto_modal(origen_nombre,destino_nombre,distancia,duracion,nombre_vehiculo,consumo);
            })
            .catch(error=>alert(`Error: ${error}`));
    }

    document.getElementById('calcular').addEventListener('click',()=>{
        const origen_nombre = origen.selectedOptions[0].getAttribute('data-nombre');
        const destino_nombre = destino.selectedOptions[0].getAttribute('data-nombre');
        const select_vehiculo =document.getElementById('vehiculo').value; 
        let vehiculo; 
        if (select_vehiculo == 'Fiat Argo') {
            vehiculo = new Fiat();
        } else if (select_vehiculo == 'Toyota Prius'){
            vehiculo = new Toyota();
        } else if (select_vehiculo == 'Suzuki Alto 800') {
            vehiculo = new Suzuki();
        } else {
            vehiculo = new Nissan();
        }

        if (origen.value =="jps") {
           navigator.geolocation.getCurrentPosition(function(position){
            const latitud_actual=position.coords.latitude;
            const longitud_actual=position.coords.longitude;                
            hacer_fetch(`${latitud_actual},${longitud_actual}`, destino.value, origen_nombre, destino_nombre, vehiculo);
            });
        } else {
            hacer_fetch(origen.value, destino.value, origen_nombre, destino_nombre, vehiculo);
        }
    });





// Santiago	-33.45694, -70.64827
// Puente Alto	-33.61169, -70.57577
// Antofagasta	-23.65236, -70.3954
// Viña del Mar	-33.02457, -71.55183
// Valparaíso	-33.036, -71.62963
// Talcahuano	-36.72494, -73.11684
// San Bernardo	-33.59217, -70.6996
// Temuco	-38.73965, -72.59842
// Iquique	-20.21326, -70.15027
// Concepción	-36.82699, -73.04977
// Rancagua	-34.17083, -70.74444
// La Pintana	-33.58331, -70.63419
// Talca	-35.4264, -71.65542
// Arica	-18.4746, -70.29792
// Coquimbo	-29.95332, -71.33947
// Puerto Montt	-41.4693, -72.94237
// La Serena	-29.90453, -71.24894
// Chillán	-36.60664, -72.10344
// Villa Alemana	-33.04222, -71.37333
// Calama	-22.45667, -68.92371