
import { Advantages, Htag, Product, Sort, Tag } from "../../components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from './TopPageComponent.module.css';
import { HhData } from "../../components/HhData/HhData";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { SortEnum } from "../../components/Sort/Sort.props";
import { useEffect, useReducer } from "react";
import { SortReducer } from "./sort.reducer";
import { useReducedMotion } from "framer-motion";


export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
    const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(SortReducer, { products, sort: SortEnum.Rating });
    const shouldReduceMotion = useReducedMotion();


    const setSort = (sort: SortEnum) => {
        dispatchSort({ type: sort });
    };

    useEffect(() => {
        dispatchSort({ type: 'reset', initialState: products });
    }, [products]);


    return (
        <div >
            <div className={styles.title}>
                <Htag tag={"h1"}>{page.title}</Htag>
                {products && <Tag color="gray" size="M" aria-label={products.length + 'элементов'}>{products.length}</Tag>}
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div role='list'>
                {sortedProducts && sortedProducts.map(p => (<Product role='listitem' layout={shouldReduceMotion ? false : true} key={p._id} product={p} />))}
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
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
            <Htag tag="h2">Получаемые навыки</Htag>
            {page.tags.map(t => <Tag color="primary" size="S" key={t}>{t}</Tag>)}
        </div>
    );
};