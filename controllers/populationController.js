const populationService = require("../services/populationService");

exports.getPopulation = async (req, res) => {
    try{
        const city = req.params.city;
        const populationData = await populationService.getPopulationData(city);
        if (!populationData || !populationData.data || populationData.data.length === 0) {
            console.error("Unexpected population data format:", populationData);
            return res
                .status(500)
                .json({ error: "Invalid population data received from the API" });
        }
        res.json(populationData.data);
    }catch (error) {
        console.error("Error fetching population data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};