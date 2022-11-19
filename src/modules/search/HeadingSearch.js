function HeadingSearch({title, className}) {
    return ( 
        <h2 className={`w-full text-2xl font-bold text-white mb-3 ${className}`}>
            {title}
        </h2>
     );
}

export default HeadingSearch;