// Core dependencies
import React from 'react';
import compStyles from './explore-table.module.css'

class ExploreTable extends React.Component {

    constructor() {
        super();
    }

    render() {
        let {exploreCounts, exploreLinks, exploreHref} = this.props;

        return (
            <svg className={compStyles.exploreTable} width="291px" height="205px" viewBox="0 0 291 205">
                <defs/>
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-95.000000, -648.000000)">
                        <g id="explore" transform="translate(83.000000, 483.000000)">
                            <g id="exploreTable" transform="translate(12.000000, 164.000000)">
                                <g id="Spleen" transform="translate(0.000000, 192.000000)">
                                    <a href={exploreHref + exploreLinks[8]}>
                                        <text fontFamily="Montserrat-Regular, Montserrat" fontSize="12"
                                              fontWeight="normal" fill="#4A4A4A">
                                            <tspan x="225" y="14">{exploreCounts[8]}</tspan>
                                        </text>
                                        <rect fill="#EAEAEA"
                                              transform="translate(158.000000, 8.000000) scale(-1, -1) rotate(-90.000000) translate(-158.000000, -8.000000) "
                                              x="154" y="-47" width="8" height="110"/>
                                        <text id="SpleenText" fontFamily="Montserrat-Regular, Montserrat" fontSize="12"
                                              fontWeight="normal" fill="#000000">
                                            <tspan x="0" y="14">Spleen</tspan>
                                        </text>
                                    </a>
                                </g>
                                <g id="Liver" transform="translate(0.000000, 168.000000)">
                                    <a href={exploreHref + exploreLinks[7]}>
                                        <text fontFamily="Montserrat-Regular, Montserrat" fontSize="12"
                                              fontWeight="normal"
                                              fill="#4A4A4A">
                                            <tspan x="185" y="14">{exploreCounts[7]}</tspan>
                                        </text>
                                        <rect fill="#EAEAEA"
                                              transform="translate(138.000000, 8.000000) scale(-1, -1) rotate(-90.000000) translate(-138.000000, -8.000000) "
                                              x="134" y="-27" width="8" height="70"/>
                                        <text id="LiverText" fontFamily="Montserrat-Regular, Montserrat" fontSize="12"
                                              fontWeight="normal" fill="#000000">
                                            <tspan x="0" y="14">Liver</tspan>
                                        </text>
                                    </a>
                                </g>
                                <g id="Kidney" transform="translate(0.000000, 144.000000)">
                                    <a href={exploreHref + exploreLinks[6]}>
                                        <text fontFamily="Montserrat-Regular, Montserrat" fontSize="12"
                                              fontWeight="normal"
                                              fill="#4A4A4A">
                                            <tspan x="205" y="14">{exploreCounts[6]}</tspan>
                                        </text>
                                        <rect fill="#EAEAEA"
                                              transform="translate(148.000000, 8.000000) scale(-1, -1) rotate(-90.000000) translate(-148.000000, -8.000000) "
                                              x="144" y="-37" width="8" height="90"/>
                                        <text id="KidneyText" fontFamily="Montserrat-Regular, Montserrat" fontSize="12"
                                              fontWeight="normal" fill="#000000">
                                            <tspan x="0" y="14">Kidney</tspan>
                                        </text>
                                    </a>
                                </g>
                                <g id="Immune" transform="translate(0.000000, 120.000000)">
                                    <a href={exploreHref + exploreLinks[5]}>
                                        <text fontFamily="Montserrat-Regular, Montserrat" fontSize="12"
                                              fontWeight="normal"
                                              fill="#4A4A4A">
                                            <tspan x="185" y="14">{exploreCounts[5]}</tspan>
                                        </text>
                                        <rect fill="#EAEAEA"
                                              transform="translate(138.000000, 8.000000) scale(-1, -1) rotate(-90.000000) translate(-138.000000, -8.000000) "
                                              x="134" y="-27" width="8" height="70"/>
                                        <text id="ImmuneText" fontFamily="Montserrat-Regular, Montserrat" fontSize="12"
                                              fontWeight="normal" fill="#000000">
                                            <tspan x="0" y="14">Immune</tspan>
                                        </text>
                                    </a>
                                </g>
                                <g id="Heart" transform="translate(0.000000, 96.000000)">
                                    <a href={exploreHref + exploreLinks[4]}>
                                        <text fontFamily="Montserrat-Regular, Montserrat" fontSize="12"
                                              fontWeight="normal"
                                              fill="#4A4A4A">
                                            <tspan x="175.5" y="14">{exploreCounts[4]}</tspan>
                                        </text>
                                        <rect fill="#EAEAEA"
                                              transform="translate(133.000000, 8.000000) scale(-1, -1) rotate(-90.000000) translate(-133.000000, -8.000000) "
                                              x="129" y="-22" width="8" height="60"/>
                                        <text id="HeartText" fontFamily="Montserrat-Regular, Montserrat" fontSize="12"
                                              fontWeight="normal" fill="#000000">
                                            <tspan x="0" y="14">Heart</tspan>
                                        </text>
                                    </a>
                                </g>
                                <g id="Esophagus" transform="translate(0.000000, 72.000000)">
                                    <a href={exploreHref + exploreLinks[3]}>
                                        <text fontFamily="Montserrat-Regular, Montserrat" fontSize="12"
                                              fontWeight="normal"
                                              fill="#4A4A4A">
                                            <tspan x="215.5" y="14">{exploreCounts[3]}</tspan>
                                        </text>
                                        <rect fill="#EAEAEA"
                                              transform="translate(153.000000, 8.000000) scale(-1, -1) rotate(-90.000000) translate(-153.000000, -8.000000) "
                                              x="149" y="-42" width="8" height="100"/>
                                        <text id="EsophagusText" fontFamily="Montserrat-Regular, Montserrat"
                                              fontSize="12"
                                              fontWeight="normal" fill="#000000">
                                            <tspan x="0" y="14">Esophagus</tspan>
                                        </text>
                                    </a>
                                </g>
                                <g id="Brain" transform="translate(0.000000, 48.000000)">
                                    <a href={exploreHref + exploreLinks[2]}>
                                        <text fontFamily="Montserrat-Regular, Montserrat" fontSize="12"
                                              fontWeight="normal"
                                              fill="#4A4A4A">
                                            <tspan x="225.5" y="14">{exploreCounts[2]} hi i am long</tspan>
                                        </text>
                                        <rect fill="#EAEAEA"
                                              transform="translate(158.000000, 8.000000) scale(-1, -1) rotate(-90.000000) translate(-158.000000, -8.000000) "
                                              x="154" y="-47" width="8" height="110"/>
                                        <text id="BrainText" fontFamily="Montserrat-Regular, Montserrat" fontSize="12"
                                              fontWeight="normal" fill="#000000">
                                            <tspan x="0" y="14">Brain</tspan>
                                        </text>
                                    </a>
                                </g>
                                <g id="Marrow" transform="translate(0.000000, 24.000000)">
                                    <a href={exploreHref + exploreLinks[1]}>
                                        <text fontFamily="Montserrat-Regular, Montserrat" fontSize="12"
                                              fontWeight="normal"
                                              fill="#4A4A4A">
                                            <tspan x="185.5" y="14">{exploreCounts[1]}</tspan>
                                        </text>
                                        <rect fill="#EAEAEA"
                                              transform="translate(138.000000, 8.000000) scale(-1, -1) rotate(-90.000000) translate(-138.000000, -8.000000) "
                                              x="134" y="-27" width="8" height="70"/>
                                        <text id="MarrowText" fontFamily="Montserrat-Regular, Montserrat" fontSize="12"
                                              fontWeight="normal" fill="#000000">
                                            <tspan x="0" y="14">Bone Marrow</tspan>
                                        </text>
                                    </a>
                                </g>
                                <g id="Blood">
                                    <a href={exploreHref + exploreLinks[0]}>
                                        <text fontFamily="Montserrat-Regular, Montserrat" fontSize="12"
                                              fontWeight="normal"
                                              fill="#4A4A4A">
                                            <tspan x="185" y="14">{exploreCounts[0]}</tspan>
                                        </text>
                                        <rect fill="#EAEAEA"
                                              transform="translate(138.000000, 8.000000) scale(-1, -1) rotate(-90.000000) translate(-138.000000, -8.000000) "
                                              x="134" y="-27" width="8" height="70"/>
                                        <text id="BloodText" fontFamily="Montserrat-Regular, Montserrat" fontSize="12"
                                              fontWeight="normal" fill="#000000">
                                            <tspan x="0" y="14">Blood</tspan>
                                        </text>
                                    </a>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}

export default ExploreTable;
