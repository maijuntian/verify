/**
 *
 * Copyright 2018-present cat_chain
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React, {Component} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {View} from "react-native";
import {screenHeight, screenWidth} from "../../style"; // remove PROVIDER_GOOGLE import if not using Google Maps


const ASPECT_RATIO = screenWidth / screenHeight;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export class TestPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            polyline: [
                {
                    latitude: LATITUDE + SPACE,
                    longitude: LONGITUDE + SPACE,
                },
                {
                    latitude: LATITUDE - SPACE,
                    longitude: LONGITUDE - SPACE,
                },
                {
                    latitude: LATITUDE - (2 * SPACE),
                    longitude: LONGITUDE - (2 * SPACE),
                },
                {
                    latitude: LATITUDE - (3 * SPACE),
                    longitude: LONGITUDE - (3 * SPACE),
                },
            ],
            markers: [
                {
                    latlng: {
                        latitude: LATITUDE + SPACE,
                        longitude: LONGITUDE + SPACE,
                    },
                    title: "a",
                    description: "testa"
                },
                {
                    latlng: {
                        latitude: LATITUDE - SPACE,
                        longitude: LONGITUDE - SPACE,
                    },
                    title: "b",
                    description: "testa"
                },
                {
                    latlng: {
                        latitude: LATITUDE - (SPACE * 2),
                        longitude: LONGITUDE - (SPACE * 2),
                    },
                    title: "c",
                    description: "testa"
                },
                {
                    latlng: {
                        latitude: LATITUDE - (SPACE * 3),
                        longitude: LONGITUDE - (SPACE * 3),
                    },
                    title: "d",
                    description: "testa"
                },
            ]
        }
    }

    render() {
        return (
            <View style={{
                height: 400,
                width: 400,
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{
                        height: 400,
                        width: 400,
                    }}
                    region={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    <Polyline
                        coordinates={this.state.polyline}
                        strokeColor="rgba(122,125,127,1)"
                        strokeWidth={2}
                        lineDashPattern={[5, 2, 3, 2]}
                    />
                    {this.state.markers.map(marker => (
                        <Marker
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                            image={require("../../img/icon_point1.png")}
                            anchor={{ x: 0.5, y: 0.5 }}
                        />
                    ))}


                </MapView>
            </View>
        )
    }
}