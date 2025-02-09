import { Controller } from "@hotwired/stimulus"
import { getDistance, convertDistance } from 'geolib';
import { isEmpty } from 'lodash-es';

export default class extends Controller {
    static targets = [ "permissionGrantedButton", "property", "locationEnable" ]
    
    connect() {
        console.log(this.element.dataset.latitude);
        console.log(this.element.dataset.longitude);
        
        if (isEmpty(this.element.dataset.latitude) || isEmpty(this.element.dataset.longitude)) {
            this.permissionGrantedButtonTarget.addEventListener('click', () => {

                if ("geolocation" in navigator) {
                    window.navigator.geolocation.getCurrentPosition(
                        (position) => {
                            this.setUserCoordinates( position.coords);
                            this.setDistanceText();
                        },
                        (error) => {
                            console.error("Error retrieving position:", error);
                        },
                        { enableHighAccuracy: true } // Enable high accuracy
                    );
                } else {
                    console.error("Geolocation is not supported by this browser.");
                }
            });
        } else {
            this.setDistanceText();
        }   
    }

    setUserCoordinates(coordinates) {
        this.element.dataset.latitude = coordinates.latitude;
        this.element.dataset.longitude = coordinates.longitude;
    }

    getUserCoordinates() {
        return {
            latitude: this.element.dataset.latitude,
            longitude: this.element.dataset.longitude
        };
    }

    setDistanceText(startingCoordinates) {
        this.locationEnableTarget.classList.add('hidden');
        this.propertyTargets.forEach((propertyTarget) => {
            let distanceFrom = getDistance(
                this.getUserCoordinates(),
                { latitude: propertyTarget.dataset.latitude, longitude: propertyTarget.dataset.longitude}
            );

            propertyTarget.querySelector('[data-distance-away]').innerHTML = `${Math.round(convertDistance(distanceFrom, 'km'))} kilometers away`;

        });
    }
}