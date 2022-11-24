import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import QualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQuality = () => {
    return useContext(QualityContext);
};

export const QulitiesProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [qulitiesList, setQulitiesList] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getQuailitiesList();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    const getQualityList = (qulitiesId) => {
        const quialityNewList = [];
        for (const qualityId of qulitiesId) {
            for (const qualityItem of qulitiesList) {
                if (qualityId === qualityItem._id) {
                    quialityNewList.push(qualityItem);
                }
            }
        }
        return quialityNewList;
    };

    async function getQuailitiesList() {
        try {
            const { content } = await QualityService.get();
            setQulitiesList(content);
            setIsLoading(false);
        } catch (error) {
            errorCather(error);
        }
    }
    function errorCather(error) {
        const { message } = error.response.data;
        setError(message);
        setIsLoading(false);
    }
    return (
        <QualityContext.Provider
            value={{ getQualityList, isLoading }}
        >
            {children}
        </QualityContext.Provider>
    );
};
QulitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
