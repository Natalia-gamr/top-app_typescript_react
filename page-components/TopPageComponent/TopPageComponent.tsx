
import { Advantages, Htag, P, Tag } from "../../components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from './TopPageComponent.module.css';
import { HhData } from "../../components/HhData/HhData";
import { TopLevelCategory } from "../../interfaces/page.interface";


export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
    return (
        <div >
            <div className={styles.title}>
                <Htag tag={"h1"}>{page.title}</Htag>
                {products && <Tag color="gray" size="M">{products.length}</Tag>}
                <span>Сортировка</span>
            </div>
            <div>
                {products && products.map(p => (<div key={p._id}>{p.title}</div>))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag={"h2"}>Вакансии - {page.category}</Htag>
                {products && <Tag color="red" size="M">hh.ru</Tag>}
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
            {page.advantages && page.advantages.length > 0 &&
                <>
                    <Htag tag="h2">Преимущества</Htag>
                    <Advantages advantages={page.advantages}></Advantages>
                </>
            }
            {page.seoText && <P>{page.tags}</P>}
            <Htag tag="h2">Получаемые навыки</Htag>
            {page.tags.map(t => <Tag color="primary" size="S" key={t}>{t}</Tag>)}
        </div>
    );
};