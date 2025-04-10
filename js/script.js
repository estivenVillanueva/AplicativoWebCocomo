document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cocomoForm');
    const calcType = document.getElementById('calcType');
    const programmersGroup = document.getElementById('programmersGroup');
    const durationGroup = document.getElementById('durationGroup');
    const resultsSection = document.getElementById('results');

    // Constants for COCOMO 81 intermediate model
    const COCOMO_CONSTANTS = {
        organic: { a: 3.2, b: 1.05, c: 2.5, d: 0.38 },
        'semi-detached': { a: 3.0, b: 1.12, c: 2.5, d: 0.35 },
        embedded: { a: 2.8, b: 1.20, c: 2.5, d: 0.32 }
    };

    // Handle calculation type changes
    calcType.addEventListener('change', function() {
        programmersGroup.style.display = this.value === 'duration' ? 'block' : 'none';
        durationGroup.style.display = this.value === 'team' ? 'block' : 'none';
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const kloc = parseFloat(document.getElementById('kloc').value);
        const mode = document.getElementById('mode').value;
        const salary = parseFloat(document.getElementById('salary').value);
        const calcType = document.getElementById('calcType').value;
        
        // Calculate EAF (Effort Adjustment Factor)
        let eaf = 1.0;
        const factorIds = ['rely', 'data', 'cplx', 'time', 'stor', 'virt', 'turn', 
                          'acap', 'aexp', 'pcap', 'vexp', 'lexp', 'modp', 'tool', 'sced'];
        
        factorIds.forEach(id => {
            eaf *= parseFloat(document.getElementById(id).value);
        });

        // Get COCOMO constants for selected mode
        const constants = COCOMO_CONSTANTS[mode];

        // Calculate effort
        const effort = constants.a * Math.pow(kloc, constants.b) * eaf;

        // Calculate duration
        const duration = constants.c * Math.pow(effort, constants.d);

        // Calculate team size
        const teamSize = effort / duration;

        // Calculate cost
        let cost = 0;
        let remainingMonths = duration;
        let currentSalary = salary;
        let year = 1;

        while (remainingMonths > 0) {
            const monthsInYear = Math.min(12, remainingMonths);
            cost += teamSize * currentSalary * monthsInYear;
            remainingMonths -= monthsInYear;
            year++;
            currentSalary *= 1.05; // 5% increase per year
        }

        // Display results based on calculation type
        let finalEffort = effort;
        let finalDuration = duration;
        let finalTeamSize = teamSize;

        if (calcType === 'duration') {
            const programmers = parseFloat(document.getElementById('programmers').value);
            finalDuration = effort / programmers;
            finalTeamSize = programmers;
        } else if (calcType === 'team') {
            const desiredDuration = parseFloat(document.getElementById('duration').value);
            finalTeamSize = effort / desiredDuration;
            finalDuration = desiredDuration;
        }

        // Update results display
        document.getElementById('effortResult').textContent = finalEffort.toFixed(2);
        document.getElementById('durationResult').textContent = finalDuration.toFixed(2);
        document.getElementById('teamSizeResult').textContent = Math.ceil(finalTeamSize);
        document.getElementById('costResult').textContent = cost.toFixed(2);

        // Generate interpretation
        const interpretation = generateInterpretation(mode, finalEffort, finalDuration, finalTeamSize, cost);
        document.getElementById('interpretationText').textContent = interpretation;

        // Show results section
        resultsSection.style.display = 'block';
    });

    // Generate interpretation text
    function generateInterpretation(mode, effort, duration, teamSize, cost) {
        let modeDescription = '';
        switch(mode) {
            case 'organic':
                modeDescription = 'un proyecto pequeño y simple con equipos experimentados';
                break;
            case 'semi-detached':
                modeDescription = 'un proyecto de tamaño medio con equipos mixtos';
                break;
            case 'embedded':
                modeDescription = 'un proyecto complejo con requisitos estrictos';
                break;
        }

        return `Basado en el modelo COCOMO 81 intermedio para ${modeDescription}, el proyecto requerirá aproximadamente ${effort.toFixed(2)} persona-mes de esfuerzo. 
        Con un equipo de ${Math.ceil(teamSize)} programadores, el proyecto tomará aproximadamente ${duration.toFixed(2)} meses en completarse. 
        El costo total estimado del proyecto es de $${cost.toFixed(2)} USD, considerando aumentos salariales anuales del 5%.`;
    }

    // Form reset handler
    form.addEventListener('reset', function() {
        resultsSection.style.display = 'none';
        programmersGroup.style.display = 'none';
        durationGroup.style.display = 'none';
    });
}); 