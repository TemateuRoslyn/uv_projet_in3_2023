

interface ImageCellProps {
    value: string
}

export const ImageCellRender: React.FC<ImageCellProps> = ({value}) => {

    return (
        <img src={value} alt={'photo'}style={{maxWidth: '100%', maxHeight: '100%',}}  />
    )
}