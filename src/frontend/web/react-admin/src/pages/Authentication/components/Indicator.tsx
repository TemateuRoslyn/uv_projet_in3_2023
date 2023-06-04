
interface IndicatorProps {
  height: number,
  widtf: number,
  border: string,
}

const Indicator: React.FC<IndicatorProps> = (props) => {
  return (
        <div className="flex justify-center">
          <div className={`animate-spin rounded-full h-${props.height} w-${props.widtf} border-t-2 border-b-2 border-${props.border}`}></div>
        </div>
    )
}

export default Indicator;