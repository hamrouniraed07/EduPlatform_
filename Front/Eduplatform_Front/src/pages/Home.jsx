import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '50px'
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white',
        maxWidth: '800px'
      }}>
        <h1 style={{
          fontSize: '48px',
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>
          Bienvenue sur EduPlatform
        </h1>
        <p style={{
          fontSize: '20px',
          marginBottom: '40px',
          opacity: 0.9
        }}>
          Découvrez des milliers de cours en ligne et développez vos compétences
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link
            to="/courses"
            style={{
              padding: '15px 40px',
              backgroundColor: 'white',
              color: '#667eea',
              textDecoration: 'none',
              borderRadius: '30px',
              fontSize: '18px',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s'
            }}
          >
            Parcourir les cours
          </Link>
          
          {!isAuthenticated && (
            <Link
              to="/register"
              style={{
                padding: '15px 40px',
                backgroundColor: 'transparent',
                color: 'white',
                textDecoration: 'none',
                border: '2px solid white',
                borderRadius: '30px',
                fontSize: '18px',
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}
            >
              S'inscrire gratuitement
            </Link>
          )}
        </div>

        <div style={{
          marginTop: '80px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px'
        }}>
          <div style={{ padding: '20px' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>📚</div>
            <h3>500+ Cours</h3>
            <p>Dans tous les domaines</p>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>👨‍🏫</div>
            <h3>Experts certifiés</h3>
            <p>Instructeurs qualifiés</p>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎓</div>
            <h3>Certificats</h3>
            <p>Validez vos compétences</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;