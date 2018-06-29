/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal select component.
 */

// Core dependencies
import React from 'react';
import compStyles from './hcaSelect.module.css';

let exploreData = [
    {
        facetName: "project",
        facetDisplayName: "Project",
        terms: [
            {
                termName: "1M Immune Cells",
                termCount: "127"
            },
            {
                termName: "Mouse Melanoma",
                termCount: "54"
            },
            {
                termName: "Tissue stability",
                termCount: "1"
            }
        ]
    },
    {
        facetName: "genusSpecies",
        facetDisplayName: "Genus Species",
        terms: [
            {
                termName: "Homo sapiens",
                termCount: "129"
            },
            {
                termName: "Mus musculus",
                termCount: "54"
            }
        ]
    },
    {
        facetName: "biologicalSex",
        facetDisplayName: "Biological Sex",
        terms: [
            {
                termName: "female",
                termCount: "109"
            },
            {
                termName: "male",
                termCount: "73"
            },
            {
                termName: "unknown",
                termCount: "1"
            }
        ]
    },
    {
        facetName: "organ",
        facetDisplayName: "Organ",
        terms: [
            {
                termName: "hematopoietic system",
                termCount: "127"
            },
            {
                termName: "lymph node",
                termCount: "28"
            },
            {
                termName: "tumor",
                termCount: "25"
            },
            {
                termName: "brain",
                termCount: "1"
            },
            {
                termName: "skin",
                termCount: "1"
            },
            {
                termName: "spleen",
                termCount: "1"
            }
        ]
    },
    {
        facetName: "organPart",
        facetDisplayName: "Organ Part",
        terms: [
            {
                termName: "umbilical cord blood",
                termCount: "64"
            },
            {
                termName: "bone marrow",
                termCount: "63"
            },
            {
                termName: "UBERON:0000029",
                termCount: "28"
            },
            {
                termName: "UBERON:0002097",
                termCount: "1"
            },
            {
                termName: "astrocyte",
                termCount: "1"
            }
        ]
    },
    // {
    //     facetName: "organismAge",
    //     facetDisplayName: "Organism Age",
    //     terms: [
    //         {
    //             termName: "0",
    //             termCount: "64"
    //         },
    //         {
    //             termName: "6-12",
    //             termCount: "54"
    //         },
    //         {
    //             termName: "29",
    //             termCount: "16"
    //         },
    //         {
    //             termName: "32",
    //             termCount: "8"
    //         },
    //         {
    //             termName: "36",
    //             termCount: "8"
    //         },
    //         {
    //             termName: "39",
    //             termCount: "8"
    //         },
    //         {
    //             termName: "50",
    //             termCount: "8"
    //         },
    //         {
    //             termName: "52",
    //             termCount: "8"
    //         },
    //         {
    //             termName: "26",
    //             termCount: "7"
    //         },
    //         {
    //             termName: "55-60",
    //             termCount: "1"
    //         }
    //     ]
    // },
    // {
    //     facetName: "organismAgeUnit",
    //     facetDisplayName: "Organism Age Unit",
    //     terms: [
    //         {
    //             termName: "years",
    //             termCount: "127"
    //         },
    //         {
    //             termName: "week",
    //             termCount: "54"
    //         },
    //         {
    //             termName: "year",
    //             termCount: "1"
    //         }
    //     ]
    // },
    {
        facetName: "disease",
        facetDisplayName: "Disease",
        terms: [
            {
                termName: "subcutaneous melanoma",
                termCount: "54"
            },
            {
                termName: "glioblastoma",
                termCount: "1"
            },
            {
                termName: "normal",
                termCount: "1"
            }
        ]
    },
    {
        facetName: "laboratory",
        facetDisplayName: "Laboratory",
        terms: [
            {
                termName: "Regev Lab",
                termCount: "127"
            },
            {
                termName: "MRC Cancer Unit",
                termCount: "54"
            },
            {
                termName: "Sarah Teichmann",
                termCount: "54"
            },
            {
                termName: "Cambridge Biorepository for Translational Medicine",
                termCount: "1"
            },
            {
                termName: "Human Cell Atlas (Mike Stubbington)",
                termCount: "1"
            },
            {
                termName: "Molecular Immunity Unit, Department of Medicine",
                termCount: "1"
            }
        ]
    },
    {
        facetName: "instrumentManufacturerModel",
        facetDisplayName: "Instrument Manufacturer Model",
        terms: [
            {
                termName: "Illumina Hiseq X 10",
                termCount: "127"
            },
            {
                termName: "Illumina HiSeq 2500",
                termCount: "55"
            },
            {
                termName: "Illumina HiSeq 4000",
                termCount: "1"
            }
        ]
    },
    {
        facetName: "libraryConstructionApproach",
        facetDisplayName: "Library Construction Approach",
        terms: [
            {
                termName: "10x_v2",
                termCount: "128"
            },
            {
                termName: "Smart-seq2",
                termCount: "55"
            }
        ]
    },
    {
        facetName: "protocol",
        facetDisplayName: "Protocol",
        terms: [
            {
                termName: "10x_v2_sequencing_protocol_1",
                termCount: "127"
            },
            {
                termName: "dissociation_protocol_1",
                termCount: "127"
            },
            {
                termName: "library_preparation_protocol_1",
                termCount: "127"
            },
            {
                termName: "FACS_sorting_protocol",
                termCount: "54"
            },
            {
                termName: "SmartSeq2_RTPCR_protocol",
                termCount: "54"
            },
            {
                termName: "SmartSeq2_sequencing_protocol",
                termCount: "54"
            },
            {
                termName: "tissue_dissociation_protocol",
                termCount: "54"
            },
            {
                termName: "10x_sequencing_protocol",
                termCount: "1"
            },
            {
                termName: "enrichment_protocol1",
                termCount: "1"
            },
            {
                termName: "library_protocol1",
                termCount: "1"
            },
            {
                termName: "sequencing_protocol1",
                termCount: "1"
            }
        ]
    },
    {
        facetName: "fileFormat",
        facetDisplayName: "File Format",
        terms: [
            {
                termName: "fastq.gz",
                termCount: "183"
            }
        ]
    }];

class HCASelect extends React.Component {

    constructor(props) {
        super(props);
    }

    selectedOption = (e, facetName, facet, term) => {
        this.props.selectedOption(facetName, facet, term);
        this.props.toggleSelect();
    };

    render() {
        return (
            <div>
                <div className={compStyles.hcaOptions}>
                    {exploreData.map((data, i) => <div key={i}>
                        <div className={compStyles.hcaOptionGroup}>{data.facetDisplayName}</div>
                        {data.terms.map((term, i) => <div key={i} className={compStyles.hcaOption} onClick={(e) => this.selectedOption(e, data.facetDisplayName, data.facetName, term.termName)}>
                            <span>{term.termName}</span>
                            <span>{term.termCount}</span>
                        </div>)}
                    </div>)}
                </div>
                {this.props.showOptions ?
                    <div className={compStyles.hcaSelectOverlay} onClick={this.props.toggleSelect}/> : null}
            </div>

        );
    }
}

export default HCASelect;
