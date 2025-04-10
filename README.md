# COCOMO 81 - Estimador de Proyectos de Software

Este es un aplicativo web responsivo que implementa el modelo intermedio de COCOMO 81 para realizar estimaciones de esfuerzo en proyectos de software.

## Características

- Implementación del modelo intermedio de COCOMO 81
- Cálculo de esfuerzo en persona-mes
- Estimación de duración del proyecto
- Cálculo del tamaño del equipo necesario
- Estimación de costos considerando aumentos salariales anuales
- Interfaz responsiva y amigable
- Validación de datos de entrada

## Variables Implementadas

### Factores de Ajuste
1. Fiabilidad Requerida (RELY)
2. Tamaño de la Base de Datos (DATA)
3. Complejidad del Producto (CPLX)
4. Restricciones de Tiempo (TIME)
5. Restricciones de Almacenamiento (STOR)
6. Volatilidad de la Máquina Virtual (VIRT)
7. Tiempo de Respuesta (TURN)
8. Capacidad de los Analistas (ACAP)
9. Experiencia en la Aplicación (AEXP)
10. Capacidad de los Programadores (PCAP)
11. Experiencia en la Máquina Virtual (VEXP)
12. Experiencia en el Lenguaje (LEXP)
13. Prácticas Modernas de Programación (MODP)
14. Uso de Herramientas de Software (TOOL)
15. Restricciones de Calendario (SCED)

### Modos de Proyecto
- Orgánico
- Semi-Aislado
- Empotrado

## Ejemplo de Cálculo

Para un proyecto de 50 KLOC en modo orgánico:
1. Ingrese 50 en el campo "Tamaño del Proyecto (KLOC)"
2. Seleccione "Orgánico" en el modo del proyecto
3. Ajuste los factores según las características del proyecto
4. Ingrese el sueldo mensual promedio
5. Seleccione el tipo de cálculo deseado
6. Haga clic en "Calcular"

El sistema mostrará:
- Esfuerzo estimado en persona-mes
- Duración estimada en meses
- Tamaño del equipo necesario
- Costo total estimado

## Tecnologías Utilizadas

- HTML5
- CSS3 (con variables CSS y diseño responsivo)
- JavaScript (ES6+)
- No se requieren frameworks externos

## Integrantes

[Nombres de los Integrantes]

## Fecha

[Mes] [Año] 