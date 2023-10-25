import { Col, Row, Spin } from 'antd';
import TransparentnostSearch from '../components/search/TransparentnostSearch';
import ResultTable from '../components/table/ResultTable';
import {
  TransparencyState,
  changeSearchBarValue,
  changeSelectedYearValue,
  getSearchData,
  getData,
} from 'src/redux/transparency/transparency';
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { StyledFullWidthDiv } from '../components/general/styled.ts';
import ExportButtons from '../components/buttons/ExportButtons';
import { AppDispatch } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { StyledExportButtonsDiv } from 'src/app/components/buttons/styled.ts';
import { LOADIPHLPAPI } from 'dns';

function TransparencyHome() {
  // const [isDataLoaded, setDataLoaded] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;

  const dispatch: AppDispatch = useDispatch();

  const [tempData, setTempData] = useState([]);

  const transparencyState = useSelector((state: any) => {
    return state.transparency as TransparencyState;
  });

  const { data, searchValue, selectedYear, isDataLoaded } =
    transparencyState as TransparencyState;

  const onChange = (e: any) => {
    dispatch(changeSearchBarValue(e.target.value) as any);
    searchData(e.target.value);
  };

  const searchData = (value: string) => {
    // this uses endpoint for search
    // dispatch(getSearchData(selectedYear, searchValue) as any);

    setTempData(
      data.filter(
        (item: any) =>
          item.opis.toLowerCase().includes(value) ||
          item.primatelj.toLowerCase().includes(value) ||
          item.vrstarashoda.toLowerCase().includes(value) ||
          item.oib.toLowerCase().includes(value) ||
          item.mjesto.toLowerCase().includes(value)
      )
    );
  };
  const onYearChange = (e: any) => {
    dispatch(changeSelectedYearValue(e) as any);
  };
  const onLoseFocus = (e: any) => {
    //gets default data
    dispatch(getData(selectedYear) as any);
  };

  const currentYear = useMemo(() => {
    return parseInt(selectedYear);
  }, []);

  useEffect(() => {
    // This effect runs after the initial render
    if (
      searchValue === '' ||
      searchValue === undefined ||
      searchValue === null
    ) {
      //gets default data
      dispatch(getData(selectedYear) as any);
    }
  }, [selectedYear]);

  useEffect(() => {
    dispatch(getData(selectedYear) as any);
  }, []);

  useEffect(() => {
    setTempData(data);
  }, [isDataLoaded]);

  return (
    <>
      <StyledFullWidthDiv $padding $background>
        <Col>
          <Row>
            <TransparentnostSearch
              onLoseFocus={onLoseFocus}
              buttonEnabled={searchValue !== '' && selectedYear !== ''}
              currentYear={currentYear}
              onChangeInput={onChange}
              // onSearchClick={onSearch}
              onYearSelect={onYearChange}
            />
          </Row>
          {isDataLoaded ? (
            <>
              <Row>
                <StyledExportButtonsDiv>
                  <ExportButtons csvVisible={false} xmlVisible={false} />
                </StyledExportButtonsDiv>
              </Row>
              <Row>
                <ResultTable data={tempData} />
              </Row>
            </>
          ) : (
            <StyledFullWidthDiv $center>
              <Spin size="large" indicator={antIcon} />
            </StyledFullWidthDiv>
          )}
        </Col>
      </StyledFullWidthDiv>
    </>
  );
}

export default TransparencyHome;
