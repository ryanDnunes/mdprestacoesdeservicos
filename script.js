document.addEventListener('DOMContentLoaded', function() {
    const serviceForm = document.getElementById('service-form');
    const totalPriceElement = document.getElementById('total-price');
    const modal = document.getElementById('modal');

    const servicePrices = {
        obras: 150,
        montador: 140,
        manutencao: 0,
        domestica: 200
    };

    const employeeCount = {
        obras: 1,
        montador: 1,
        manutencao: 1,
        domestica: 1
    };

    const additionalPrices = {
        camas: 80,
        'guarda-roupa': 150,
        comoda: 60,
        penteadeira: 60,
        prateleiras: 10,
        mesa: 60,
        estante: 80,
        'painel-tv': 40,
        'armario-cozinha': 150,
        balcao: 120,
        'armario-banheiro': 100,
        escrivaninha: 80,
        'chuveiro-com-caixa': 30,
        'chuveiro-sem-caixa': 40,
        'instalar-vaso': 90,
        baba: 50,
        cozinhar: 30,
        'finais-de-semana': 90
    };

    serviceForm.addEventListener('change', updateTotalPrice);

    function updateTotalPrice() {
        let totalPrice = 0;

        // Calculate total for Obras
        const obrasSelected = serviceForm.querySelectorAll('input[type="checkbox"]:checked[id^="obras"]');
        if (obrasSelected.length > 0) {
            obrasSelected.forEach(item => {
                totalPrice += servicePrices.obras * employeeCount.obras;
            });
        }

        // Calculate total for Montador de Móveis
        const montadorSelected = serviceForm.querySelectorAll('input[type="checkbox"]:checked[id^="montador"]');
        if (montadorSelected.length > 0) {
            montadorSelected.forEach(item => {
                totalPrice += servicePrices.montador * employeeCount.montador;
            });
        }

        // Calculate total for Manutenção e Obras Interiores
        const manutencaoSelected = serviceForm.querySelectorAll('input[type="checkbox"]:checked[id^="manutencao"]');
        manutencaoSelected.forEach(item => {
            totalPrice += additionalPrices[item.id] * employeeCount.manutencao;
        });

        // Calculate total for Doméstica
        const domesticaSelected = serviceForm.querySelectorAll('input[type="checkbox"]:checked[id^="domestica"]');
        if (domesticaSelected.length > 0) {
            domesticaSelected.forEach(item => {
                totalPrice += servicePrices.domestica * employeeCount.domestica;
            });
        }

        // Calculate total for additional services
        const additionalSelected = serviceForm.querySelectorAll('input[type="checkbox"]:checked:not([id^="obras"], [id^="montador"], [id^="manutencao"], [id^="domestica"])');
        additionalSelected.forEach(item => {
            totalPrice += parseInt(item.value);
        });

        totalPriceElement.textContent = `R$${totalPrice}`;
    }

    window.addEmployee = function(serviceType) {
        employeeCount[serviceType]++;
        document.getElementById(`employee-count-${serviceType}`).textContent = employeeCount[serviceType];
        updateTotalPrice();
    }

    window.removeEmployee = function(serviceType) {
        if (employeeCount[serviceType] > 1) {
            employeeCount[serviceType]--;
            document.getElementById(`employee-count-${serviceType}`).textContent = employeeCount[serviceType];
            updateTotalPrice();
        }
    }

    window.toggleOptions = function(optionsId) {
        const options = document.getElementById(optionsId);
        options.style.display = options.style.display === 'none' ? 'block' : 'none';
    }

    window.openModal = function() {
        modal.style.display = 'block';
        // Oculta o botão "Trabalhos Realizados" ao abrir o painel
        document.querySelector('.trabalhos-realizados-btn').style.display = 'none';
    }

    window.closeModal = function() {
        modal.style.display = 'none';
        // Exibe o botão "Trabalhos Realizados" ao fechar o painel
        document.querySelector('.trabalhos-realizados-btn').style.display = 'block';
    }
    
    window.submitOrder = function() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const location = document.getElementById('location').value;
        const observations = document.getElementById('observations').value; // Valor do campo de observações
        const descricao = document.getElementById('descricao').value; // Valor do campo de descrição
        const totalPrice = totalPriceElement.textContent;
    
        if (!name || !email) {
            alert('Nome e email são obrigatórios.');
            return;
        }
    
        let orderDetails = `Nome: ${name}\nEmail: ${email}\nLocalização: ${location}\nObservações: ${observations}`;
    
        // Verifica se o serviço "Obra Total" foi selecionado
        const obraTotal = document.getElementById('geral');
        if (obraTotal.checked) {
            orderDetails += `\nDescrição: ${descricao}`;
        }
    
        orderDetails += '\nServiços Selecionados:\n';
    
        const checkedServices = serviceForm.querySelectorAll('input[type="checkbox"]:checked');
        checkedServices.forEach(service => {
            orderDetails += `- ${service.nextElementSibling.textContent}: R$${service.value}\n`;
        });
    
        orderDetails += `Valor Total: R$${totalPrice}`;
    
        const whatsappLink = `https://wa.me/5551985109343?text=${encodeURIComponent(orderDetails)}`;
    
        window.open(whatsappLink);
        // Oculta o botão "Satisfeito" após enviar o pedido
        document.getElementById('satisfeito-btn').style.display = 'none';
        // Exibe o botão "Trabalhos Realizados" ao enviar o pedido
        document.querySelector('.trabalhos-realizados-btn').style.display = 'block';
    }
    

    document.querySelector('.trabalhos-realizados-btn').addEventListener('click', function() {
        const modal = document.getElementById('trabalhos-modal');
        modal.style.display = 'flex';
    });

    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('trabalhos-modal').style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        const modal = document.getElementById('trabalhos-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
});

document.addEventListener('DOMContentLoaded', function() {
    var draggableBtn = document.getElementById('draggable-btn');

    draggableBtn.addEventListener('mousedown', function(e) {
        var offsetX = e.clientX - draggableBtn.getBoundingClientRect().left;
        var offsetY = e.clientY - draggableBtn.getBoundingClientRect().top;

        function mouseMoveHandler(e) {
            draggableBtn.style.left = (e.clientX - offsetX) + 'px';
            draggableBtn.style.top = (e.clientY - offsetY) + 'px';
        }

        function reset() {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', reset);
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', reset);
    });
});
