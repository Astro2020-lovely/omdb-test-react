import classNames from "classnames";
import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import TutorialDataService from "../../services/tutorial";
import styles from "./styles.module.scss";
import logo from '../../logo.svg'; 

type Props = {};

const TutorialsList: React.FC<Props> = () => {
  const [tutorials, setTutorials] = useState([]);
  const [searchText, setSearchText] = useState("");
  const searchTitle = useDebounce(searchText, 500);

  const onChangeSearchText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    TutorialDataService.findByTitle(searchTitle)
      .then((response: any) => {
        if(response.data.Response == "True"){
          setTutorials(response.data.Search);
          console.log(response.data.Search);
        }else{
          setTutorials([]);
        }
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, [searchTitle]);

  return (
    <div className="row">
      <div className="col-md-12 mt-3">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchText}
            onChange={onChangeSearchText}
          />
        </div>
      </div>
      <div className="col-md-12 p-3">
        {tutorials.length ? (
          <div className="row">
            {tutorials?.map((content, idx) => (
              <div key={idx} className="col-md-3 mt-3">
                <div className="card border-success shadow">
                  <div className="card-header bg-transparent border-success">{content['Title']}</div>
                  <div className={classNames("card-body text-success", styles.imgcard)}>
                    <img
                      src={content['Poster'] == 'N/A' ? logo : content['Poster'] }
                      height="150px"
                      className={classNames("card-img", styles.imgvideo)}
                    />
                  </div>
                  <div className="card-footer bg-transparent border-success">{content['Year']}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (<div>No Result</div>)}
      </div>
    </div>
  );
};

export default TutorialsList;
