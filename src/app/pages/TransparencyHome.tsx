import { Col, Row, Spin, TableProps } from 'antd';
import TransparentnostSearch from '../components/search/TransparentnostSearch';
import ResultTable from '../components/table/ResultTable';
import {
  TransparencyState,
  changeSearchBarValue,
  changeSelectedYearValue,
  getData,
  getOpcineData,
} from 'src/redux/transparency/transparency';
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import {
  StyledFullWidthDiv,
  StyledHeaderDiv,
  StyledMainTitleDiv,
  StyledMainTitleH1,
} from '../components/general/styled.ts';
import ExportButtons from '../components/buttons/ExportButtons';
import { AppDispatch } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { StyledExportButtonsDiv } from 'src/app/components/buttons/styled.ts';
import { ColumnFilterItem } from 'antd/es/table/interface';
import { getPlaceName } from 'src/helper/domainHelper.ts';
import { StyledRow } from './styled.ts';

export interface StringFilters {
  text: string;
  value: string;
}
function TransparencyHome() {
  const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;

  const dispatch: AppDispatch = useDispatch();

  const [tempData, setTempData] = useState([]);
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [grbUrl, setGrbUrl] = useState('');
  const [isplatiteljColumnFilterItems, setIsplatiteljColumnFilterItems] =
    useState<ColumnFilterItem[]>([]);
  const [monthColumnFilterItems, setMonthColumnFilterItems] = useState<
    ColumnFilterItem[]
  >([]);

  const transparencyState = useSelector((state: any) => {
    return state.transparency as TransparencyState;
  });

  const {
    data,
    opcinaData,
    searchValue,
    selectedYear,
    isDataLoaded,
    isOpcinaDataLoaded,
  } = transparencyState as TransparencyState;

  const onChange = (e: any) => {
    dispatch(changeSearchBarValue(e.target.value) as any);
    searchData(e.target.value);
  };

  const searchData = (value: string) => {
    // this uses endpoint for search
    // dispatch(getSearchData(selectedYear, searchValue) as any);

    //this searches loaded data by endpoint
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

  //TODO: TEST THIS WIHT DIFFERENT SCREEN SIZES
  const rowAmountDependOnSize = () => {
    console.log(window.screen.width);
    if (window.screen.width <= 1500) {
      return 5;
    }
    return 10;
  };

  const getFilters = (data: any, variable: string) => {
    let uniqueFilters: ColumnFilterItem[] = [];

    data.forEach((item: any) => {
      if (
        !uniqueFilters.some((itemFromSet) => {
          return (
            itemFromSet.text === item[variable] &&
            itemFromSet.value === item[variable]
          );
        })
      ) {
        uniqueFilters.push({
          text: item[variable],
          value: item[variable],
        });
        //SORTING of array, potential bug for date, reason: date is string not number
        uniqueFilters = uniqueFilters.sort(
          (a: ColumnFilterItem, b: ColumnFilterItem) =>
            a.value < b.value ? -1 : a.value > b.value ? 1 : 0
        );
      }
    });
    const columnFilterItems: ColumnFilterItem[] = Array.from(uniqueFilters);
    return columnFilterItems;
  };

  const onYearChange = (e: any) => {
    dispatch(changeSelectedYearValue(e) as any);
  };
  const onSelectYear = (e: any) => {
    //gets default data
    dispatch(getData(opcinaData.url, selectedYear) as any);
    setTempData(data);
  };

  const setFavicon = (faviconUrl: string) => {
    const link: HTMLLinkElement =
      document.querySelector("link[rel~='icon']") ||
      document.createElement('link');
    console.log(link);
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = faviconUrl;
    document.getElementsByTagName('head')[0].appendChild(link);
  };

  const getAvailableYears = () => {
    const yearFromData: string[] = [];

    data.forEach((item: any) => {
      const year = item.datum.split('-')[0];
      if (!yearFromData.includes(year)) {
        yearFromData.push(year);
      }
    });
    setAvailableYears(yearFromData);
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
      dispatch(getData(opcinaData.url, selectedYear) as any);
    }
  }, [selectedYear]);

  useEffect(() => {
    if (data) {
      setTempData(data);
      setIsplatiteljColumnFilterItems(getFilters(data, 'isplatitelj'));
      setMonthColumnFilterItems(getFilters(data, 'foramtedDate'));
      getAvailableYears();
    }
  }, [isDataLoaded]);

  useEffect(() => {
    console.log('opcinaData', opcinaData);
    if (isOpcinaDataLoaded) {
      setGrbUrl(`${import.meta.env.VITE_API_IMG_URL}/${opcinaData.grb}`);
      setFavicon(`${import.meta.env.VITE_API_IMG_URL}/${opcinaData.favico}`);
      document.title = `Proracun ${opcinaData.naziv}`;
    }
    dispatch(getData(opcinaData.url, selectedYear) as any);
  }, [opcinaData]);

  useEffect(() => {
    //Good to add is OpcineData fetched flag for check

    document.title = `Proracun`;
    dispatch(getOpcineData() as any);
  }, []);

  // if (process.env.NODE_ENV === 'development') {
  //   useEffect(() => {
  //     console.log('component is mounted in development');
  //     // dispatch(getOpcineData() as any);
  //   });
  // }

  return (
    <>
      <StyledFullWidthDiv $padding $background>
        <Col>
          <StyledHeaderDiv>
            <Row>
              <Col>
                <img
                  // src={`http://127.0.0.1:8000/public/image/grb-opcina-podcrkavlje.jpg`} //${opcinaData.grb}
                  src={grbUrl}
                  //promijeniti image u img ili maknuti img iz grb u bazi!!!!!!
                  alt="Grb opcine"
                />
              </Col>
              <Col>
                <StyledMainTitleDiv className="StyledMainTitleDiv">
                  <StyledMainTitleH1>{opcinaData.naziv}</StyledMainTitleH1>
                  <p>{opcinaData.zupanija}</p>
                </StyledMainTitleDiv>
              </Col>
            </Row>
          </StyledHeaderDiv>
          {isDataLoaded ? (
            <>
              <StyledRow>
                <Col xs={8}>
                  <TransparentnostSearch
                    onSelectYear={onSelectYear}
                    currentYear={currentYear}
                    onChangeInput={onChange}
                    onYearSelect={onYearChange}
                    availableYears={availableYears}
                    // buttonEnabled={searchValue !== '' && selectedYear !== ''}
                    // onSearchClick={onSearch}
                  />
                </Col>
                <Col xs={16}>
                  <StyledExportButtonsDiv>
                    <ExportButtons
                      csvVisible={false}
                      xmlVisible={false}
                      placeName={getPlaceName()}
                      selectedYear={selectedYear}
                      dataForExport={data}
                    />
                  </StyledExportButtonsDiv>
                </Col>
              </StyledRow>
              <Row>
                <ResultTable
                  isplatiteljsFilter={isplatiteljColumnFilterItems}
                  monthFilter={monthColumnFilterItems}
                  data={tempData}
                  rowAmount={rowAmountDependOnSize()}
                />
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
