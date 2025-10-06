"use client"
const StarBorder = ({
    as: Component = 'button',
    className = '',
    color = 'white',
    speed = '6s',
    thickness = 1,
    textColor = 'white',
    children,
    ...rest
  }) => {
    return (
      <Component
        className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
        style={{
          padding: `${thickness}px 0`,
          ...rest.style
        }}
        {...rest}
      >
        {/* Bottom moving star effect */}
        <div
          className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full z-0"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed,
            animation: 'star-movement-bottom linear infinite alternate'
          }}
        ></div>
        
        {/* Top moving star effect */}
        <div
          className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full z-0"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed,
            animation: 'star-movement-top linear infinite alternate'
          }}
        ></div>
        
        {/* Content container */}
        <div 
          className="relative z-10 bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-center text-[16px] py-[16px] px-[26px] rounded-[20px]"
          style={{ color: textColor }}
        >
          {children}
        </div>
        
        <style jsx>{`
          @keyframes star-movement-bottom {
            0% {
              transform: translate(0%, 0%);
              opacity: 0.7;
            }
            100% {
              transform: translate(-100%, 0%);
              opacity: 0;
            }
          }
          
          @keyframes star-movement-top {
            0% {
              transform: translate(0%, 0%);
              opacity: 0.7;
            }
            100% {
              transform: translate(100%, 0%);
              opacity: 0;
            }
          }
        `}</style>
      </Component>
    );
  };
  
  export default StarBorder;