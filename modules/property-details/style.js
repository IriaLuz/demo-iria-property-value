import styled from "styled-components";

export const StyledOriginalPursachePrice = styled.span`
  font-weight: 600;
`;

export const AccountList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

export const AccountLabel = styled.label`
  font-size: ${(props) => props.theme.typography.xl.fontSize};
  line-height: ${(props) => props.theme.typography.xl.lineHeight};
  color: ${(props) => props.theme.colors.neutral[900]};
  margin-bottom: ${(props) => props.theme.space.s};
`;

export const AccountHeadline = styled.p`
  font-size: ${(props) => props.theme.typography["3xl"].fontSize};
  line-height: ${(props) => props.theme.typography["3xl"].lineHeight};
  font-weight: normal;
  color: ${(props) => props.theme.colors.neutral[900]};
  margin-bottom: ${(props) => props.theme.space.m};
`;

export const InfoText = styled.p`
  display: flex;
  gap: ${(props) => props.theme.space.xs};
  line-height: 1.6;
  font-size: ${(props) => props.theme.typography.m.fontSize};
  color: ${(props) => props.theme.colors.neutral[700]};
`;

export const InfoValuationChange = styled.p`
  background: ${(props) => props.theme.colors.valuationBackground};
  padding: ${(props) => props.theme.space.xs} ${(props) => props.theme.space.l};
  border-radius: 1rem;
  font-size: ${(props) => props.theme.typography.s.fontSize};
  color: ${(props) => props.theme.colors.valuationText};
  font-weight: 700;
`;

export const AccountSection = styled.div`
  padding: ${(props) => props.theme.space.m} 0;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${(props) => props.theme.colors.neutral[200]};
  }
}
`;

export const AccountListItem = styled.li`
  display: flex;
  justify-content: space-between;
  &:not(:last-of-type) {
    margin-bottom: ${(props) => props.theme.space.m};
  }
`;

export const Inset = styled.div`
  padding: 0 ${(props) => props.theme.space.m};
`;
