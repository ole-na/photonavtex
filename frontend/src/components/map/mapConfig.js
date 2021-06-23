export const mapConfig = {
    options: {
        center: [54.261, 11.474],
        zoom: 13,
        maxZoom: 18,
        scrollWheelZoom: true,
        height: "calc(100vh - 250px)"
    },

    baseMaps: [
        {
            name: "OpenStreetMap",
            display: true,
            checked: true,
            urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution: "Map data &copy; <a href='https://osm.org/copyright' rel='noOpener'>OpenStreetMap</a> contributors",
            opacity: "0.8"
        },

        {
            name: "OpenStreetMap DE",
            display: true,
            checked: false,
            urlTemplate: "https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png",
            attribution: "Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
            opacity: "0.8"
        },
    ],

    overlayMaps: [
        {
            name: "OpenSeaMap",
            display: true,
            checked: true,
            urlTemplate: "&copy; <a href='https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'",
            attribution: "&copy; <a href='https://www.openseamap.org'>OpenSeaMap</a> contributors",
            opacity: "0.8"
        }
    ]
}
