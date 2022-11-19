import styled from 'styled-components'

function HeaderNavItem({children, className}) {
    return ( 
        <HeaderNavItemStyles>
            <button 
                className={` text-textColor2 font-bold text-base tracking-widest ${className}`}
            >
                {children}
            </button>
        </HeaderNavItemStyles>
     );
}

const HeaderNavItemStyles = styled.div`
    button{
        transition: color 33ms ;
    }
    button:hover{
        transform: scale(1.04);
        color: #FFF
    }
`

export default HeaderNavItem;