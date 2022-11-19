import styled from 'styled-components'


function ButtonBorder({ children }) {
    return (
        <ButtonBorderStyles>
            <button className="py-2 px-8 text-black bg-white rounded-full font-bold text-base">
                {children}
            </button>
        </ButtonBorderStyles>
    );
}

const ButtonBorderStyles = styled.div`

    button{
        transition: background-color 33ms ;
    }

    button:hover{
        transform: scale(1.05);
        background-color: #b7b7b7
    }
`

export default ButtonBorder;