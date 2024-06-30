import { FC, useState } from 'react'

import styles from './MyAccordion.module.scss'
import ServiceItem from './serviceItem/ServiceItem'

const serviceData = [
	{
		title: 'Лицо',
		content: 'Мы использем современные технологии, такие как Icoone Laser и RF-лифтинг, и высококачественные косметические средства.'
	},
	{
		title: 'Тело',
		content: 'Мы использем современные технологии, такие как Icoone Laser и RF-лифтинг, и высококачественные косметические средства.'
	},
	{
		title: 'Волосы',
		content: 'Мы использем современные технологии, такие как Icoone Laser и RF-лифтинг, и высококачественные косметические средства.'
	},
	{
		title: 'Ногти',
		content: 'Мы использем современные технологии, такие как Icoone Laser и RF-лифтинг, и высококачественные косметические средства.'
	},
]

const Services: FC = () => {
	const [isOpen, setIsOpen] = useState(null)

	const clickHandler = (id: any) => {
		isOpen !== id ? setIsOpen(id) : setIsOpen(null)
	}

	return (
		<section className={styles.container}>
			<div className={styles.services_inner}>
				{
					serviceData.map((item, index) => {
						return(
							<ServiceItem
								content={item.content}
								title={item.title} 
								isOpen={isOpen}
								clickHandler={clickHandler}
								index={index}
								key={index}
							/>
						)
					})
				}
			</div>
		</section>
	)
}

export default Services