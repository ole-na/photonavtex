import React from "react";

export const routeServices = {
    clearRoutePointValue: function(event, item) {
            event.preventDefault()
            document.getElementById(item).value = "";
    },
    checkRoutePointValue: function(value) {
        const latLongRegex = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)(, )(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

 
        return latLongRegex.test(value);
    },
}
