document.addEventListener("DOMContentLoaded", function () {
    // Funcion Toastify
    function showToast(message, type) {
        Toastify({
            text: message,
            duration: 5000,
            gravity: "top",
            position: 'right',
            backgroundColor: type === 'success' ? '#4CAF50' : '#FF5722',
        }).showToast();
    }

    // Funcion para mostrar Calorias 
    function updateCalorieInfo(calories) {
        const calorieInfo = document.getElementById("calorie-info");
        calorieInfo.textContent = `Tu necesidad calórica diaria es: ${calories.toFixed(2)} kcal`;

        // Calculo para "Bulking" y "Cutting"
        const bulkingCalories = calories + 500; // Incrementar 500 Kcal 
        const cuttingCalories = calories - 500; // Bajar 500 Kcal 

        const calorieRecommendation = document.getElementById("calorie-recommendation");
        calorieRecommendation.innerHTML = `Para ganar peso (bulking): ${bulkingCalories.toFixed(2)} kcal al día<br>`;
        calorieRecommendation.innerHTML += `Para perder peso (cutting): ${cuttingCalories.toFixed(2)} kcal al día`;
    }

    // Funcion para resetear datos de "Recomendaciones"
    function resetCalorieInfo() {
        const calorieInfo = document.getElementById("calorie-info");
        calorieInfo.textContent = '';

        const calorieRecommendation = document.getElementById("calorie-recommendation");
        calorieRecommendation.textContent = '';
    }

    // Funcion para Calcular Calorias 
    function calcularCalorias() {
        const edad = parseFloat(document.getElementById("edad").value);
        const peso = parseFloat(document.getElementById("peso").value);
        const altura = parseFloat(document.getElementById("altura").value);
        const sexo = document.getElementById("sexo").value;
        const nivelActividad = document.getElementById("nivelActividad").value;

        // Logica para Calcular las Calorias Necesarias 
        let calorias = 0;
        if (sexo === "masculino") {
            calorias = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * edad);
        } else if (sexo === "femenino") {
            calorias = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * edad);
        }

        // Ajuste en base a la Actividad Fisica 
        switch (nivelActividad) {
            case "sedentario":
                calorias *= 1.2;
                break;
            case "ligero":
                calorias *= 1.375;
                break;
            case "moderado":
                calorias *= 1.55;
                break;
            case "activo":
                calorias *= 1.725;
                break;
            case "muyActivo":
                calorias *= 1.9;
                break;
        }

        // Ajuste de la informacion de Calorias 
        updateCalorieInfo(calorias);

        // Mensaje de "Exito" de Toastify 
        showToast("Necesidad calórica calculada correctamente.", "success");
    }

    // Funcion para establecer meta de ganancia muscular 
    function establecerMetas() {
        const metaPeso = parseFloat(document.getElementById("metaPeso").value);
        const metaActividad = document.getElementById("metaActividad").value;

        // Funcion de Guardado de metas 
        const meta = {
            peso: metaPeso,
            actividad: metaActividad,
        };

        // Muestra de Metas 
        const listaMetas = document.getElementById("listaMetas");
        const listItem = document.createElement("li");
        listItem.textContent = `Meta de peso: ${meta.peso} kg, Meta de actividad: ${meta.actividad}`;
        listaMetas.appendChild(listItem);

        // Mostrar mensaje de Sweet Alert de "Metas establecidas"
        Swal.fire({
            title: 'Metas Establecidas',
            text: 'Tus metas de masa muscular han sido establecidas correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }

    // Funcion de Eventos de Botones 
    document.getElementById("calcularCalorias").addEventListener("click", calcularCalorias);
    document.getElementById("establecerMetas").addEventListener("click", establecerMetas);

    // Reseteo de Datos al oprimir el boton "Reiniciar"
    let botonBorrarDatos = document.getElementById('borrarDatos');
    botonBorrarDatos.addEventListener('click', function () {
        Swal.fire({
            title: 'Seguro que quieres reiniciar?',
            text: "No puedes revertir este paso",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quiero'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Borrado!',
                    'Acabas de reiniciar todos los datos',
                    'success'
                )
                document.getElementById("edad").value = "";
                document.getElementById("peso").value = "";
                document.getElementById("altura").value = "";
                document.getElementById("sexo").value = "masculino";
                document.getElementById("nivelActividad").value = "sedentario";
                document.getElementById("metaPeso").value = "";
                document.getElementById("metaActividad").value = "";
                document.getElementById("listaMetas").innerHTML = "";
                localStorage.clear()
                resetCalorieInfo();
            }
        })
    });

    // Funcion del Evento del boton "Nuevo Guardado "
    document.getElementById("nuevoGuardado").addEventListener("click", function () {
        Swal.fire({
            title: '¿Deseas crear un nuevo guardado?',
            text: 'Esto creará un nuevo registro en el almacenamiento local.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, crear nuevo guardado'
        }).then((result) => {
            if (result.isConfirmed) {
                const timestamp = new Date().getTime();
                const key = `guardado_${timestamp}`;
                localStorage.setItem(key, 'Some data for your new entry');

                Swal.fire(
                    'Guardado!',
                    'Se ha creado un nuevo guardado.',
                    'success'
                );
            }
        });
    });
});
