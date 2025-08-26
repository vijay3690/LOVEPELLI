import { Component } from "react";
import SelectAge from "../select/selectage";
import SelectState from "../select/selectstate";
import SelectGender from "../select/selectgender";
import {MODALSEARCHTITLE,LABELCHANGEONE,LABELCHANGETWO,LABELCHANGETHREE,LABELCHANGEFOUR,SEARCHBTNTEXT } from "./sidebarconsts";


class ModalSearch extends Component {
    render() { 
        return (
            <div className="modal-content border-0 mb-4">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel1">{MODALSEARCHTITLE}</h5>
                </div>
                <div className="modal-body">
                    <form action="#">
                        <div className="banner__list">
                            <div className="row align-items-center row-cols-1">
                                <div className="col">
                                    <label>{LABELCHANGEONE}</label>
                                    <div className="banner__inputlist">
                                        <SelectGender select={'male'} />
                                    </div>
                                </div>
                                <div className="col">
                                    <label>{LABELCHANGETWO}</label>
                                    <div className="banner__inputlist">
                                        <SelectGender select={'female'} />
                                    </div>
                                </div>
                                <div className="col">
                                    <label>{LABELCHANGETHREE}</label>
                                    <div className="row g-3">
                                        <div className="col-6">
                                            <div className="banner__inputlist">
                                                <SelectAge select={'18'} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="banner__inputlist">
                                                <SelectAge select={'25'} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <label>{LABELCHANGEFOUR}</label>
                                    <div className="banner__inputlist">
                                        <SelectState select={'Andhra Pradesh'} />
                                    </div>
                                </div>
                                <div className="col">
                                    <button type="submit" className="default-btn d-block w-100"><span>{SEARCHBTNTEXT} </span></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default ModalSearch;