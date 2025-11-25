import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ 
          color: 'white', 
          textDecoration: 'none',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          🎓 EduPlatform
        </Link>
        <Link to="/courses" style={{ 
          color: 'white', 
          textDecoration: 'none',
          fontSize: '16px',
          transition: 'color 0.3s'
        }}>
          Cours
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {isAuthenticated ? (
          <>
            <Link to="/profile" style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontSize: '16px'
            }}>
              👤 Profil ({user.username})
            </Link>
            <button
              onClick={logout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ 
              color: 'white', 
              textDecoration: 'none',
              padding: '8px 16px',
              backgroundColor: '#3498db',
              borderRadius: '5px',
              fontSize: '14px'
            }}>
              Connexion
            </Link>
            <Link to="/register" style={{ 
              color: 'white', 
              textDecoration: 'none',
              padding: '8px 16px',
              backgroundColor: '#27ae60',
              borderRadius: '5px',
              fontSize: '14px'
            }}>
              Inscription
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;