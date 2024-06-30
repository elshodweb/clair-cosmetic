import { FC } from 'react'
import styles from './Item.price.module.scss'

interface props {
    title?: string
    price?: number
}

const ItemPrice: FC<props> = (props) => {
    const {title, price} = props
    return(
    <div className={styles.list_item}>
        <div className={styles.info}>
            <div className={styles.title}>Название</div>
            <div className={styles.text}>
                Пилинг PRX-T33
                Пилинг PRX-T33
                Пилинг PRX-T33
            </div>
        </div>
        <button className={styles.price_button}>
            <div>от 1700</div>
        </button>
    </div>
    )
}

export default ItemPrice