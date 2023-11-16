import { fontHeader, midScreenHeight, midScreenWidth, mobileScreenWidth } from "src/app/global/constants";
import { css, styled } from "styled-components";

export const StyledFullWidthDiv = styled.div<{$padding?: boolean, $center?: boolean, $background?: boolean}>`
    flex: 1;

    //gives gradient blue background
    // ${props => props.$padding && css`
    //     background: linear-gradient(0deg, rgba(34,193,195,0) 0%, rgba(45,119,253,1) 100%);
    // `}

    ${props => props.$padding && css`
    //pushes footer from the main content
        margin-bottom: 50px;

        // For under 2k res screens max-width: 1900px
        // @media only screen and (max-width: 1900px) {
            padding: 0 7%;
        // }
        @media only screen and (max-width: ${mobileScreenWidth}px) {
            padding: 0 50;
        }
    `}
    
    ${props => props.$center && css`
        display: flex;
        flex-direction: column;
        // justify-content: center;
        // align-items: center;
        min-height: 100vh;
    `};
`

// export const StyledHeaderDiv = styled.div`
//     margin: 40px 0 30px 0;
//     display: flex;
//     flex-direction: column;
//     gap: 30px;
// `

export const StyledHeaderLine = styled.div`
height: 1px;
background-color: black;
width: 100%;
`

export const StyledMainTitleDiv = styled.div`
    margin-bottom: 30px;
    display: flex;
    justify-content: start;
    align-items: center;

    @media only screen and (max-width: ${mobileScreenWidth}px) {
        font-size: ${1.8}rem;
        margin-bottom: 0px;
        flex-direction: column;
    }
`
export const StyledAppTitleH1 = styled.h1`
    // margin: auto;
    margin: 0;
    // letter-spacing: 0.3rem;
    line-height: 1;
    font-size: 2.6rem;
    font-weight: 300;
    text-transform: uppercase;
    font-family: ${fontHeader};
    font-weight: 700;
    text-align: center;

    @media only screen and (max-width: ${midScreenWidth}px) {
        font-size: ${2.4}rem;
    }

    @media only screen and (max-width: ${mobileScreenWidth}px) {
        font-size: ${1.8}rem;
        margin-bottom: 0px;
    }
`

export const StyledAppHeaderDiv = styled.div`    
    width: 100%;
    margin-top:40px;
    margin-bottom:70px;

    h2 {
        font-size: ${2.5/Math.pow(1.25, 2)}rem;
        font-weight: inherit;
    }
    h3 {
        font-size: ${2.5/Math.pow(1.25, 3)}rem;
        font-weight: inherit;
    }
    p{
        // font-size: ${1.5/Math.pow(1.25, 2)}rem;
        font-weight: inherit;
    }

    @media only screen and (max-width: ${midScreenWidth}px) {
        width: 100%;
        margin-bottom: 0;

        h2 {
            font-size: ${2/Math.pow(1.25, 2)}rem;
            font-weight: inherit;
        }
        h3 {
            font-size: ${2/Math.pow(1.25, 2)}rem;
            font-weight: inherit;
        }
    }

    @media only screen and (max-width: ${mobileScreenWidth}px) {
        width: 100%;

        h2 {
            font-size: ${1.5/Math.pow(1.25, 2)}rem;
            font-weight: inherit;
        }
        h3 {
            font-size: ${1.5/Math.pow(1.25, 2)}rem;
            font-weight: inherit;
        }
    }
`

export const StyledMainTitlRow = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const StyledPlaceInfoDiv = styled.div`
// background-color: purple;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    // margin-bottom: 50px;
    float: left;
    height: 70px;

    div{
        display: flex;
        flex-direction: column;
        align-items: start;
        // justify-content: space-between;
    }

    img{
        height: 75px;
        width: auto;
    }
    @media only screen and (max-width: ${midScreenWidth}px) {
        img{
            height: 55px;
            width: auto;
        }
    }
    @media only screen and (max-width: ${mobileScreenWidth}px) {
        img{
            height: 40px;
            width: auto;
        }
    }
`

export const StyledMobileMainTtileDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    // font-family: 'Abhaya Libre', serif;
    margin-bottom: 10px;

    h1{
        width: fit-content;
        font-size: ${2}rem;
        font-weight: inherit;
        width: 50%;
    }
`

export const StyledPlaceInfoH1 = styled.h2<{$center?: boolean}>`
    text-align: ${props => props.$center ? 'center' : 'default'};
    margin: 0;
    font-family: ${fontHeader};
    // font-size: ${1.8}rem;
    font-weight: inherit;
    a {
        link-style: none;
        color: black;
    }

    @media only screen and (max-width: ${mobileScreenWidth}px) {
        font-size: ${1.5}rem;
    }
`

export const StyledPlaceInfoH2 = styled.h3<{$center?: boolean}>`
text-align: ${props => props.$center ? 'center' : 'default'};
font-family: ${fontHeader};

margin: 0;
a {
    link-style: none;
    color: black;
}
`

export const StyledCenterDivWrapper = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
`