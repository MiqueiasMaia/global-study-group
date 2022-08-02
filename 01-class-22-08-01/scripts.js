const api = 'https://swapi.dev/api/planets?page=1';

const getData = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: api,
            method: 'GET',
            headers: {},
            success: response => resolve(response.results),
            error: error => reject(error),
        });
    });
};

const main = async () => {
    try {
        const planets = await getData();
        console.log(`All planets`);
        console.log(planets);

        const temperatePlanets = filterWeather(planets, 'temperate');
        console.log(`Temperate planets`);
        console.log(temperatePlanets);

        const planetsUrl = getPlanetsUrl(temperatePlanets);
        console.log(`Planets url`);
        console.log(planetsUrl);

        const firstIndex = getFirstIndex(planets, '1000');
        console.log(`First index ${firstIndex}`);

        const hasRotationPeriod = hasPlannetWithRotationPeriod(planets, '24');
        console.log(`Has rotation period ${hasRotationPeriod}`);

        const allPlanetsHaveRotationPeriod24 = allPlanetsHaveRotationPeriod(planets, '24');
        console.log(`All planets have rotation period ${allPlanetsHaveRotationPeriod24}`);

        const planetsNames = joinAllPlanetsNames(planets);
        console.log(`Planets names ${planetsNames}`);

        popFirstPlanet(planets);
        console.log(`Pop first planet`);
        console.log(planets);

        popLastPlanet(planets);
        console.log(`Pop last planet`);
        console.log(planets);

        movePlanetToBeginning(planets, planets[7]);
        console.log(`Move planet to beginning`);
        console.log(planets);

        movePlanetToEnd(planets, planets[5]);
        console.log(`Move planet to end`);
        console.log(planets);

        orderPlanetsByName(planets);
        console.log(`Order planets by name`);
        console.log(planets);
    } catch (error) {
        console.log(error);
    }
}

const filterWeather = (planets, weather) => {
    return planets.filter(planet => planet.climate === weather);
};

const getPlanetsUrl = (planets) => {
    return planets.map(planet => planet.url);
}

const getFirstIndex = (planets, quantity) => {
    return planets.findIndex(planet => planet.population === quantity);
}

const hasPlannetWithRotationPeriod = (planets, rotationPeriod) => {
    return planets.some(planet => planet.rotation_period === rotationPeriod);
}

const allPlanetsHaveRotationPeriod = (planets, rotationPeriod) => {
    return planets.every(planet => planet.rotation_period === rotationPeriod);
}

const joinAllPlanetsNames = (planets) => {
    return planets.map(planet => planet.name).join(', ');
}

const popFirstPlanet = (planets) => {
    return planets.shift();
}

const popLastPlanet = (planets) => {
    return planets.pop();
}

const movePlanetToBeginning = (planets, planet) => {
    const index = planets.findIndex(p => p.name === planet.name);
    planets.splice(index, 1);
    planets.unshift(planet);
}

const movePlanetToEnd = (planets, planet) => {
    const index = planets.findIndex(p => p.name === planet.name);
    planets.splice(index, 1);
    planets.push(planet);
}

const orderPlanetsByName = (planets) => {
    return planets.sort((a, b) => a.name > b.name ? 1 : -1);
}

main();