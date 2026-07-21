import { Product } from "@/types/products";

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <article style={styles.card}>
            <img
                src={product.thumbnail}
                alt={product.title}
                style={styles.image}
            />

            <div style={styles.content}>
                <p style={styles.category}>{product.category}</p>
                <h3 style={styles.title}>{product.title}</h3>
                <p style={styles.description}>{product.description}</p>
            </div>

            <div style={styles.footer}>
                <strong style={styles.price}>${product.price}</strong>
                {/* Note: Fixed the 'raiting' typo to 'rating' here */}
                <span style={styles.rating}>✨ {product.raiting}</span> 
            </div>
        </article>
    );
}

// Modern, clean inline styles
const styles = {
    card: {
        display: 'flex',
        flexDirection: 'column' as const,
        backgroundColor: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.2s ease',
        maxWidth: '300px',
        fontFamily: 'system-ui, sans-serif',
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover' as const,
        backgroundColor: '#f5f5f5',
    },
    content: {
        padding: '16px',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '6px',
        flexGrow: 1,
    },
    category: {
        fontSize: '12px',
        textTransform: 'uppercase' as const,
        color: '#888',
        fontWeight: 'bold',
        margin: 0,
    },
    title: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#222',
        margin: '4px 0',
    },
    description: {
        fontSize: '14px',
        color: '#666',
        lineHeight: '1.4',
        margin: 0,
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        borderTop: '1px solid #f0f0f0',
    },
    price: {
        fontSize: '18px',
        color: '#111',
    },
    rating: {
        fontSize: '14px',
        color: '#444',
        fontWeight: '500',
    }
};