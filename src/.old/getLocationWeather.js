export default async location => {
    try {
        const result = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3ae5425598f745d7d1de990eea45d3dd&units=metric`,
        );

        if (result.status === 200) {
            return { success: true, data: await result.json() };
        }

        return { success: false, error: result.statusText };
    } catch (ex) {
        return { success: false, error: ex.message };
    }
};
