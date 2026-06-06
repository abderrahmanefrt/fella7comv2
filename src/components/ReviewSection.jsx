import { useState } from 'react';
import { Star, Send, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useReview } from '../context/ReviewContext';
import { useLanguage } from '../context/LanguageContext';
import './ReviewSection.css';

function StarRating({ rating, onRate, interactive = false, size = 18 }) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="star-rating" onMouseLeave={() => interactive && setHoverRating(0)}>
      {[1, 2, 3, 4, 5].map(star => {
        const filled = interactive
          ? star <= (hoverRating || rating)
          : star <= rating;

        return (
          <button
            key={star}
            type="button"
            className={`star-btn ${filled ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            disabled={!interactive}
            aria-label={`${star} étoile${star > 1 ? 's' : ''}`}
          >
            <Star size={size} fill={filled ? 'var(--color-warning)' : 'none'} color={filled ? 'var(--color-warning)' : 'var(--color-border)'} />
          </button>
        );
      })}
    </div>
  );
}

function ReviewForm({ productId, onSubmitted }) {
  const { user } = useAuth();
  const { addReview, hasUserReviewed } = useReview();
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="review-login-prompt">
        <p>{t('review.loginPrompt')}</p>
      </div>
    );
  }

  if (hasUserReviewed(productId, user.id)) {
    return (
      <div className="review-already-done">
        <CheckCircle size={18} className="text-primary" />
        <p>{t('review.alreadyReviewed')}</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="review-success">
        <CheckCircle size={24} className="text-primary" />
        <p>{t('review.successReview')}</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError(t('review.selectRatingError'));
      return;
    }
    if (comment.trim().length < 5) {
      setError(t('review.commentLengthError'));
      return;
    }

    addReview(productId, user.id, user.name, rating, comment.trim());
    setSubmitted(true);
    if (onSubmitted) onSubmitted();
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h4>{t('review.writeReviewHeader')}</h4>

      <div className="review-form-rating">
        <label>{t('review.yourRatingLabel')}</label>
        <StarRating rating={rating} onRate={setRating} interactive size={24} />
        {rating > 0 && <span className="rating-label">{rating}/5</span>}
      </div>

      <div className="form-group">
        <textarea
          placeholder={t('review.reviewPlaceholder')}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
        />
      </div>

      {error && <p className="text-danger" style={{ fontSize: '0.82rem', marginBottom: '8px' }}>{error}</p>}

      <button type="submit" className="btn-primary review-submit-btn">
        <Send size={16} /> {t('review.submitReviewBtn')}
      </button>
    </form>
  );
}

function ComplaintForm({ productId }) {
  const { user } = useAuth();
  const { submitComplaint } = useReview();
  const { t } = useLanguage();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!user) return null;

  if (submitted) {
    return (
      <div className="review-success">
        <CheckCircle size={24} className="text-primary" />
        <p>{t('review.successComplaint')}</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!subject.trim()) {
      setError(t('review.subjectError'));
      return;
    }
    if (description.trim().length < 10) {
      setError(t('review.descError'));
      return;
    }

    submitComplaint(user.id, user.name, productId, subject.trim(), description.trim());
    setSubmitted(true);
  };

  return (
    <form className="complaint-form" onSubmit={handleSubmit}>
      <div className="complaint-header">
        <AlertTriangle size={18} className="text-warning" />
        <h4>{t('review.reportTitle')}</h4>
      </div>

      <div className="form-group">
        <label>{t('review.subjectLabel')}</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)} required>
          <option value="">{t('review.selectSubjectPlaceholder')}</option>
          <option value="Qualité non conforme">{t('review.sub1')}</option>
          <option value="Quantité incorrecte">{t('review.sub2')}</option>
          <option value="Produit endommagé">{t('review.sub3')}</option>
          <option value="Vendeur non joignable">{t('review.sub4')}</option>
          <option value="Description trompeuse">{t('review.sub5')}</option>
          <option value="Autre">{t('review.sub6')}</option>
        </select>
      </div>

      <div className="form-group">
        <label>{t('review.detailLabel')}</label>
        <textarea
          placeholder={t('review.detailPlaceholder')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />
      </div>

      {error && <p className="text-danger" style={{ fontSize: '0.82rem', marginBottom: '8px' }}>{error}</p>}

      <button type="submit" className="btn-secondary review-submit-btn">
        <AlertTriangle size={16} /> {t('review.btnSubmitComplaint')}
      </button>
    </form>
  );
}

export default function ReviewSection({ productId }) {
  const { getProductReviews, getAverageRating } = useReview();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('reviews');

  const reviews = getProductReviews(productId);
  const avgRating = getAverageRating(productId);

  return (
    <div className="review-section">
      <div className="review-section-header">
        <h2>{t('review.header')}</h2>
        {reviews.length > 0 && (
          <div className="review-summary">
            <div className="review-avg-rating">
              <span className="avg-number">{avgRating}</span>
              <StarRating rating={Math.round(avgRating)} size={16} />
            </div>
            <span className="review-count">{reviews.length} {t('review.reviewCount')}</span>
          </div>
        )}
      </div>

      <div className="review-tabs">
        <button
          className={`review-tab ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          {t('review.tabReviews')} ({reviews.length})
        </button>
        <button
          className={`review-tab ${activeTab === 'write' ? 'active' : ''}`}
          onClick={() => setActiveTab('write')}
        >
          {t('review.tabWrite')}
        </button>
        <button
          className={`review-tab ${activeTab === 'complaint' ? 'active' : ''}`}
          onClick={() => setActiveTab('complaint')}
        >
          {t('review.tabComplaint')}
        </button>
      </div>

      <div className="review-tab-content">
        {activeTab === 'reviews' && (
          <div className="reviews-list">
            {reviews.length === 0 ? (
              <div className="reviews-empty">
                <p>{t('review.noReviews')}</p>
                <span>{t('review.firstReviewPrompt')}</span>
              </div>
            ) : (
              reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-card-header">
                    <div className="review-author">
                      <div className="review-author-avatar">
                        {review.userName[0]}
                      </div>
                      <div>
                        <span className="review-author-name">{review.userName}</span>
                        <span className="review-date">{review.date}</span>
                      </div>
                    </div>
                    <StarRating rating={review.rating} size={14} />
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'write' && (
          <ReviewForm productId={productId} onSubmitted={() => setActiveTab('reviews')} />
        )}

        {activeTab === 'complaint' && (
          <ComplaintForm productId={productId} />
        )}
      </div>
    </div>
  );
}
