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
<svg className={compStyles.exploreTable} width="339px" height="229px" viewBox="0 0 339 229">
    <defs/>
    <g id="explorePerson" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="explore" transform="translate(0.000000, -170.000000)">
            <g id="stats" transform="translate(0.000000, 169.000000)">
                <g id="statsSpleen" transform="translate(0.000000, 216.000000)">
                    <text id="countSpleen" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#4A4A4A">
                        <tspan x="117" y="14">13,000</tspan>
                    </text>
                    <polygon id="barSpleen" fill="#EAEAEA" points="103 12 105 12 105 4 103 4"/>
                    <text id="labelSpleen" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#000000">
                        <tspan x="0" y="14">Spleen</tspan>
                    </text>
                </g>
                <g id="statsPancreas" transform="translate(0.000000, 192.000000)">
                    <text id="countPancreas" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#4A4A4A">
                        <tspan x="116" y="14">2,544</tspan>
                    </text>
                    <polygon id="barPancreas" fill="#EAEAEA" points="103 12 103.532 12 103.532 4 103 4"/>
                    <text id="labelPancreas" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#000000">
                        <tspan x="0" y="14">Pancreas</tspan>
                    </text>
                </g>
                <g id="statsLiver" transform="translate(0.000000, 168.000000)">
                    <text id="countLiver" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#4A4A4A">
                        <tspan x="116" y="14">0</tspan>
                    </text>
                    <polygon id="barLiver" fill="#EAEAEA" points="103 12 104 12 104 4 103 4"/>
                    <text id="labelLiver" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#000000">
                        <tspan x="0" y="14">Liver</tspan>
                    </text>
                </g>
                <g id="statsKidney" transform="translate(0.000000, 144.000000)">
                    <text id="countKidney" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#4A4A4A">
                        <tspan x="147" y="14">5,000</tspan>
                    </text>
                    <polygon id="barKidney" fill="#EAEAEA" points="103 12 135 12 135 4 103 4"/>
                    <text id="labelKidney" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#000000">
                        <tspan x="0" y="14">Kidney</tspan>
                    </text>
                </g>
                <g id="statsImmune" transform="translate(0.000000, 120.000000)">
                    <text id="countImmune" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#4A4A4A">
                        <tspan x="121" y="14">250,000</tspan>
                    </text>
                    <polygon id="barImmune" fill="#EAEAEA" points="103 12 109 12 109 4 103 4"/>
                    <text id="labelImmune" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#000000">
                        <tspan x="0" y="14">Immune</tspan>
                    </text>
                </g>
                <g id="statsHeart" transform="translate(0.000000, 96.000000)">
                    <text id="countHeart" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#4A4A4A">
                        <tspan x="175.5" y="14">50,000</tspan>
                    </text>
                    <rect id="barHeart" fill="#EAEAEA" x="103" y="4" width="60" height="8"/>
                    <text id="labelHeart" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#000000">
                        <tspan x="0" y="14">Heart</tspan>
                    </text>
                </g>
                <g id="statsEsophagus" transform="translate(0.000000, 72.000000)">
                    <text id="countEsophagus" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#4A4A4A">
                        <tspan x="116" y="14">9,800</tspan>
                    </text>
                    <polygon id="barEsophagus" fill="#EAEAEA" points="103 12 104 12 104 4 103 4"/>
                    <text id="labelEsophagus" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#000000">
                        <tspan x="0" y="14">Esophagus</tspan>
                    </text>
                </g>
                <g id="statsBrain" transform="translate(0.000000, 48.000000)">
                    <text id="countBrain" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#4A4A4A">
                        <tspan x="283.5" y="14">1,321,732</tspan>
                    </text>
                    <polygon id="barBrain" fill="#EAEAEA" points="103 12 271 12 271 4 103 4"/>
                    <text id="labelBrain" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#000000">
                        <tspan x="0" y="14">Brain</tspan>
                    </text>
                </g>
                <g id="statsMarrow" transform="translate(0.000000, 24.000000)">
                    <text id="countMarrow" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#4A4A4A">
                        <tspan x="166.5" y="14">399,000</tspan>
                    </text>
                    <polygon id="barMarrow" fill="#EAEAEA" points="103 12 154 12 154 4 103 4"/>
                    <text id="labelMarrow" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#000000">
                        <tspan x="0" y="14">Bone Marrow</tspan>
                    </text>
                </g>
                <g id="statsBlood">
                    <text id="countBlood" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#4A4A4A">
                        <tspan x="148" y="14">263,000</tspan>
                    </text>
                    <polygon id="barBlood" fill="#EAEAEA" points="103 12 136 12 136 4 103 4"/>
                    <text id="labelBlood" fontFamily="Montserrat-Regular, Montserrat" fontSize="14" fontWeight="normal" fill="#000000">
                        <tspan x="0" y="14">Blood</tspan>
                    </text>
                </g>
            </g>
        </g>
    </g>
</svg>
    );
    }
}

export default ExploreTable;
