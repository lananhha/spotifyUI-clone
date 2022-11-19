import styled from "styled-components";
function Loading() {
    return (
        <LoadingStyles>
            <div className="load-wrapp">
                <div className="load-3">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div>
        </LoadingStyles>
    );
}
const LoadingStyles = styled.div`
  .line {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: #778899;
    margin: 0 6px
  }
  .load-3 .line:nth-last-child(1) {
    animation: loadingC 0.8s 0.1s linear infinite;
  }
  .load-3 .line:nth-last-child(2) {
    animation: loadingC 0.8s 0.2s linear infinite;
  }
  .load-3 .line:nth-last-child(3) {
    animation: loadingC 0.8s 0.3s linear infinite;
  }
  @keyframes loadingC {
    0 {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(0, 15px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  
`
export default Loading;